/* Estrutura reproduzida de themes/custom/views/layouts e views/aluno. */
(() => {
  const student=globalThis.MandalaStudent;
  const R=globalThis.MandalaStudentRules;
  const html=esc;
  let tccView='list',deliveryView='list',previousRoute='';
  const aluno=()=>$('#profile').value==='Aluno';
  const visitor=()=>$('#profile').value==='Visitante';
  const link=(label,key,children=[])=>`<li class="item-test ${active===key?'active':''}"><a href="#${key}">${label}</a>${children.length?`<ul class="nav-sub">${children.map(([name,route])=>`<li class="item-test"><a href="#${route}">${name}</a></li>`).join('')}</ul>`:''}</li>`;
  nav=function(){
    let items='';
    if(aluno())items=link('Monte sua trilha pedagógica / inscrição em componentes','trilha')+link('Histórico','notas')+link('TCC','tcc-inicio',[['Cadastro','tcc'],['Entrega','entregas']])+link('Meu perfil','perfil');
    else if(!visitor()){
      const role=$('#profile').value;
      if(role==='Secretaria')items=link('Estudantes','estudantes',[['Gerenciar Inscrições','estudantes'],['Visualizar alunos matriculados','matriculados'],['Gerenciar TCC','tcc'],['Emitir certificados','certificados']])+link('Componentes','ofertas',[['Gerenciar ofertas','ofertas'],['Gerenciar componentes','componentes'],['Gerenciar habilitações','habilitacoes'],['Visualizar número de inscrições em ofertas','inscricoes-ofertas'],['Notas','notas']])+link('Gestão de pessoas','pessoas',[['Docentes','docentes'],['Tutores','tutores'],['Colaboradores','colaboradores']])+link('Encontros','encontros')+link('Financeiro','financeiro',[['Pagamentos de alunos','financeiro'],['Pagamentos de colaboradores','pagamentos-colaboradores'],['Viagens','viagens'],['Compras','compras']])+link('Relatórios','relatorios')+link('Configurações','configuracoes');
      if(role==='Docente')items=link('Ver ofertas','ofertas');
      if(role==='Orientador')items=link('Avaliar TCC','tcc',[['Pendentes','tcc'],['Avaliados','tcc-avaliados']]);
      if(role==='Colaborador')items=link('Meu perfil','perfil-colaborador');
    }
    $('#nav').innerHTML=items;
    $('#access-link').textContent=visitor()?'Acessar Sistema':'Sair';
    $('#access-link').href=visitor()?'#acesso':'#sair';
  };
  function habilitations(){return `<div class="legacy-habilitations">${student.habilitations.map((h,i)=>`<h3>Habilitação ${i+1}: ${html(h)}</h3>`).join('')}</div><div class="legacy-priorities"><h3>Legenda das prioridades</h3><ul><li><b>NFO</b>: Núcleo Formativo Obrigatório</li><li><b>NFE</b>: Núcleo Formativo Específico</li><li><b>NFC</b>: Núcleo Formativo Complementar</li></ul></div>`;}
  function summary(){const c=R.count(student.offers,student.draft()),range=R.range(2);const checks=[[c.habilitations.every(h=>h.counts[0]>=4),'Selecionou 4 NFO?'],...c.habilitations.map((h,i)=>[h.counts[1]>=10,`H${i+1} tem 10 ou mais NFE?`]),...c.habilitations.map((h,i)=>[h.total>=20&&h.total<=21,`H${i+1} tem entre 20 e 21 no total?`]),[c.distinct>=range.min&&c.distinct<=range.max,`O total de componentes distintos está entre ${range.min} e ${range.max}?`]];return `<div class="resumo-fiel"><table class="criterios"><thead><tr><th colspan="2">Critérios</th></tr></thead><tbody>${checks.map(([ok,label])=>`<tr class="${ok?'cumpriu-criterios':'nao-cumpriu-criterios'}"><td>${label}</td><td>${ok?'✓':'✗'}</td></tr>`).join('')}</tbody></table><table><thead><tr><th>Componentes</th><th>H1</th><th>H2</th></tr></thead><tbody>${['NFO (mín. 4)','NFE (mín. 10)','NFC','Distintos'].map((label,i)=>`<tr><td>${label}</td>${c.habilitations.map(h=>`<td>${i===3?h.distinct:h.counts[i]}</td>`).join('')}</tr>`).join('')}<tr><td>Total</td>${c.habilitations.map(h=>`<td>${h.total}</td>`).join('')}</tr></tbody></table>${c.habilitations.some(h=>h.total>21)?'<p class="atencao">Sua trilha tem mais componentes que o máximo previsto. Se desejar mantê-la assim, pode haver cobrança de parcelas extras.</p>':''}</div>`;}
  function profileView(){const p=student.state.profile;return `<h1>Meu perfil</h1><ul class="legacy-links"><li><button id="edit-profile">Editar perfil</button></li><li><button id="password-info">Trocar senha</button></li><li><a href="#notas">Histórico</a></li><li><button data-print="matricula">Atestado de matrícula</button></li></ul><br><p><b>Status da inscrição:</b> Matriculado</p><br><table class="legacy-profile detail-view"><tbody>${Object.entries(student.profileLabels).map(([key,label])=>`<tr><th>${html(label)}</th><td>${html(p[key]||'Não informado')}</td></tr>`).join('')}<tr><th>Modalidade</th><td>A distância</td></tr><tr><th>Candidato à bolsa</th><td>Não</td></tr><tr><th>Tipo de curso</th><td>Especialização</td></tr></tbody></table><br><h2>Formação</h2><ul>${student.state.formations.map(f=>`<li>${html(f.nivel)} - ${html(f.curso)} - ${html(f.instituicao)} (${html(f.ano)})</li>`).join('')}</ul><br><h2>Habilitações escolhidas</h2>${student.habilitations.map((h,i)=>`<h3>Habilitação ${i+1}: ${html(h)}</h3>`).join('')}<h2>Documentos</h2><p>Ainda não enviou os documentos</p>`;}
  function styleFields(root=$('#content')){
    root.querySelectorAll('label.field').forEach(label=>{const first=label.firstChild;if(first?.nodeType===3){const span=document.createElement('span');span.className='field-label';span.textContent=first.textContent;first.replaceWith(span)}});
  }
  function decorate(){
    if(previousRoute!==active){if(active==='tcc')tccView='list';if(active==='entregas')deliveryView='list';previousRoute=active;}
    $('#breadcrumb').hidden=active==='painel'||visitor();
    if(!aluno())return;
    const content=$('#content');
    if(active==='painel')content.innerHTML=`<h2>Olá, ${html(student.state.profile.nome)}</h2><p>Seja bem vindo(a) ao sistema acadêmico do EduTec!</p><p>Aqui você terá acesso à sua trilha pedagógica (componentes curriculares escolhidos), ao seu histórico e poderá fazer modificações no meu perfil.</p>`;
    if(active==='trilha'){
      const head=content.querySelector('.intro');if(head)head.outerHTML='<h1>Inscrição em ofertas</h1><br>';
      const warning=content.querySelector('.notice');if(warning)warning.outerHTML='<p class="atencao">As ofertas passadas e correntes não podem ser alteradas, dessa forma realize a escolha correta dos componentes para não ter problemas futuros.</p>';
      const h=content.querySelector('.habilitations');if(h)h.outerHTML=habilitations();content.querySelector('.priority-legend')?.remove();
      const count=content.querySelector('#trail-counts');if(count)count.innerHTML=summary();
      content.querySelectorAll('.offer-table').forEach(table=>table.classList.add('table','tabela-inscricao'));
      content.querySelectorAll('.panel-heading').forEach(el=>{const title=el.querySelector('h2'),badge=el.querySelector('.pill');if(title&&badge){if(badge.textContent.includes('bloqueado'))title.append(' (período bloqueado)');badge.remove()}});
      const integrator=content.querySelector('.trail-layout>div>.panel');integrator?.querySelector('.panel-heading')?.remove();
      content.querySelector('[data-print]')?.replaceChildren('Gerar PDF');
    }
    if(active==='notas'){
      const head=content.querySelector('.intro');if(head)head.outerHTML=`<h1>Histórico de componentes cursadas de ${html(student.state.profile.nome+' '+student.state.profile.sobrenome)}</h1>`;
      const h=content.querySelector('.habilitations');if(h)h.outerHTML=habilitations();content.querySelector('.priority-legend')?.remove();
      content.querySelectorAll('table').forEach(t=>t.classList.add('historico'));
      const a=content.querySelector('[data-print=historico]'),b=content.querySelector('[data-print=limpo]');if(a)a.textContent='Gerar PDF';if(b)b.textContent='Gerar PDF - histórico limpo';
    }
    if(active==='perfil'){
      if(!student.profileEditing())content.innerHTML=profileView();
      else {
        content.querySelector('.intro')?.replaceWith(Object.assign(document.createElement('h1'),{textContent:'Editar perfil'}));
        content.querySelector('.student-actions')?.remove();
        const form=content.querySelector('#student-profile');if(form){const identity=form.querySelector('section');if(identity){const legend=identity.querySelector('h2');if(legend)legend.textContent='Dados pessoais'} }
        content.querySelectorAll('.student-card').forEach(card=>{const h=card.querySelector('h2');if(h){const legend=document.createElement('legend');legend.textContent=h.textContent;h.replaceWith(legend)}});
      }
    }
    if(active==='tcc'){
      content.querySelector('.tcc-tabs')?.remove();content.querySelector('.student-context')?.remove();
      if(tccView==='list'){
        content.innerHTML=`<h1>Cadastro de TCC</h1><ul class="legacy-tcc-list">${student.habilitations.map((h,i)=>`<h3>Habilitação ${i+1}: ${html(h)}</h3><button type="button" class="legacy-bare-link" data-open-tcc="${i}">${html(student.state.tccs[i].title||'Cadastrar TCC')}</button>`).join('')}</ul>`;
        content.querySelectorAll('[data-open-tcc]').forEach(b=>b.onclick=()=>{student.selectTcc(Number(b.dataset.openTcc));tccView='edit';student.refresh()});
      } else {
        content.querySelector('.intro')?.replaceWith(Object.assign(document.createElement('h1'),{textContent:tccView==='characterization'?'Caracterização do especialista':'Editar TCC'}));
        content.querySelector('.student-actions')?.remove();
        const form=content.querySelector('#student-tcc'),fields=[...form.querySelectorAll('label.field')];
        if(tccView==='characterization'){
          form.innerHTML=`<input type="hidden" name="title" value="${html(student.state.tccs[student.selectedTcc()].title)}">${fields.slice(1).map(f=>f.outerHTML).join('')}<button type="submit">Salvar</button>`;
          content.querySelectorAll('.panel').forEach(p=>{if(!p.closest('form'))p.remove()});
        }else{
          fields.slice(1).forEach(f=>f.remove());form.querySelector('h3')?.remove();
          const button=document.createElement('button');button.type='button';button.className='legacy-bare-link';button.textContent='Editar caracterização do especialista';button.onclick=()=>{tccView='characterization';student.refresh()};
          const fieldset=document.createElement('fieldset');fieldset.innerHTML='<legend>Caracterização do especialista</legend>';fieldset.append(button);form.querySelector('.profile-grid')?.replaceWith(fieldset);
          const habilitation=document.createElement('div');habilitation.className='legacy-form-row';habilitation.innerHTML=`<label>Habilitação</label><p>${html(student.habilitations[student.selectedTcc()])}</p>`;form.prepend(habilitation);
          form.querySelector('h2')?.remove();
          [...form.querySelectorAll('p')].find(p=>p.textContent.startsWith('Tipo:'))?.remove();
          const submit=form.querySelector('button[type=submit]');if(submit){submit.textContent='Salvar';submit.setAttribute('form','student-tcc');content.append(submit);}
          content.querySelectorAll('.tcc-item p').forEach(p=>p.remove());
          content.querySelectorAll('.panel-heading h2').forEach(h=>{if(h.textContent==='Sínteses de componentes')h.textContent='Sínteses dos componentes mais essenciais realizados no EduTec (5 ou mais)';if(h.textContent==='Propostas pedagógicas')h.textContent='Ideias e propostas de aplicação pedagógica de tecnologias digitais (3 ou mais)';const legend=document.createElement('legend');legend.textContent=h.textContent;const section=h.closest('.panel'),add=h.parentElement.querySelector('[data-add-tcc]');h.parentElement.remove();section.prepend(legend);if(add){add.textContent=add.dataset.addTcc==='syntheses'?'Cadastrar nova síntese':'Cadastrar nova proposta';add.className='legacy-bare-link';section.append(add)}section.querySelector('.module-note')?.remove();});
        }
        const back=document.createElement('button');back.type='button';back.className='legacy-bare-link';back.textContent='Voltar para Cadastro de TCC';back.onclick=()=>{tccView='list';student.refresh()};content.prepend(back);
      }
    }
    if(active==='entregas'){
      content.querySelector('.tcc-tabs')?.remove();content.querySelector('.student-context')?.remove();
      if(deliveryView==='list'){
        content.innerHTML=`<h1>Entrega de TCC</h1><p>Qual TCC deseja entregar?</p><ul>${student.state.tccs.map((t,i)=>t.title?`<li><button class="legacy-bare-link" data-open-delivery="${i}">${html(t.title)}</button></li>`:'').join('')}</ul>`;
        content.querySelectorAll('[data-open-delivery]').forEach(b=>b.onclick=()=>{student.selectTcc(Number(b.dataset.openDelivery));deliveryView='edit';student.refresh()});
      }else{
        content.querySelector('.intro')?.replaceWith(Object.assign(document.createElement('h1'),{textContent:'Entrega de TCC: '+student.state.tccs[student.selectedTcc()].title}));content.querySelector('.student-actions')?.remove();content.querySelector('.tcc-timeline')?.remove();
      }
    }
    styleFields();
  }
  function login(){return `<div class="legacy-login"><fieldset><h1>Acesso</h1><br><p>Por favor, informe seu CPF e sua senha: </p><br><div class="form"><form id="demo-login"><div class="login-row"><label for="LoginForm_username">CPF <span class="required">*</span></label><input id="LoginForm_username" name="username" required autocomplete="off"></div><div class="login-row"><label for="LoginForm_password">Senha <span class="required">*</span></label><input id="LoginForm_password" name="password" type="password" required autocomplete="off"></div><div class="login-row"><input id="rememberMe" name="rememberMe" type="checkbox"><label for="rememberMe">Lembrar de mim</label></div><input type="submit" value="Acessar o Sistema"></form><p><a href="#recuperar-senha">Esqueci minha senha</a></p></div></fieldset><p class="module-note">Acesso de demonstração: usuário <b>aluno</b>, senha <b>demo</b>. Não utilize credenciais reais. Nenhuma senha é armazenada.</p></div>`;}
  const existingRender=render;
  function itemForm(root,key,item,onDelete){
    const heading=root.querySelector('h2'),h1=document.createElement('h1');h1.textContent=(onDelete?'Editar ':'Cadastrar ')+(key==='syntheses'?'síntese de componente':'proposta pedagógica');heading.replaceWith(h1);root.querySelector('.module-note')?.remove();
    if(key==='syntheses'){
      const input=root.querySelector('[name=title]'),select=document.createElement('select');select.name='title';select.required=true;
      select.innerHTML='<option value="">Escolha o componente curricular</option>'+[...new Set(student.offers.map(o=>o.name))].map(name=>`<option value="${html(name)}" ${name===item.title?'selected':''}>${html(name)}</option>`).join('');input.replaceWith(select);root.querySelector('datalist')?.remove();
    }else{
      const options={nivel_formacao:{infantil_1:'Educação infantil 1 (creche – 0 a 3 anos)',infantil_2:'Educação infantil 2 (pré-escolar – 3 a 6 anos)',fundamental_1:'Ensino fundamental 1 (1º ao 5º ano)',fundamental_2:'Ensino fundamental 2 (6º ao 9º ano)',medio:'Ensino médio',superior:'Ensino superior',aberta:'Educação aberta (informal, não-formal ou livre)',outro:'Outro'},area_conhecimento:{ciencias:'Ciências em geral',artes:'Artes',biologia:'Biologia',fisica:'Física',geografia:'Geografia',historia:'História',lingua_portuguesa:'Língua portuguesa',matematica:'Matemática',quimica:'Química',tecnologicas:'Tecnologias',outra:'Outra'},modalidade:{presencial:'Educação presencial',distância:'Educação a Distância',outra:'Outra'},tipo_proposta:Object.fromEntries(['Aplicação de atividade pedagógica (em sala de aula ou AVA)','Manejo de turma na oferta de disciplina em EaD','Gerenciamento da aprendizagem (manejo de turma/estudantes)','Coordenação de atividades pedagógicas','-----','Elaboração de atividades pedagógicas','Produção de materiais didáticos','Organização de conteúdos didáticos','Planejamento de atividades e materiais didáticos','Preparação e organização de disciplinas em EaD','-----','Gerenciamento das atividades de professores','Gerenciamento das atividades de tutores','Gerenciamento de equipes e recursos humanos','Gerenciamento de trabalho colaborativo (em grupo)','-----','Coordenação pedagógica de cursos EaD','Gerenciamento da produção de materiais didáticos','Gerenciamento de comunicação e interações','Gerenciamento de infraestrutura e tecnologias','Gerenciamento de processos administrativos ou técnicos','Gerenciamento financeiro','Gerenciamento logístico (fluxos e processos)','-----','Outra'].map((label,i)=>[i+1,label]))};
      for(const [field,values] of Object.entries(options)){
        const input=root.querySelector(`[name=${field}]`),select=document.createElement('select');select.name=field;
        select.innerHTML='<option value="">Selecionar</option>'+Object.entries(values).map(([value,label])=>`<option value="${html(value)}" ${String(item[field])===String(value)?'selected':''}>${html(label)}</option>`).join('');input.replaceWith(select);
      }
      const fieldset=document.createElement('fieldset');fieldset.innerHTML='<legend>Descrição da proposta de aplicação</legend>';const first=root.querySelector('[name=descricao_dinamica]').closest('label');first.before(fieldset);root.querySelectorAll('textarea').forEach(area=>fieldset.append(area.closest('label')));
      const type=root.querySelector('[name=tipo_proposta]').closest('label');fieldset.after(type);
    }
    root.querySelectorAll('textarea').forEach(t=>{t.rows=10;t.maxLength=3000});
    if(onDelete){const button=document.createElement('button');button.type='button';button.className='btn btn-danger';button.textContent=key==='syntheses'?'Excluir síntese':'Excluir proposta';button.onclick=onDelete;root.querySelector('.dialog-actions').append(button)}
    styleFields(root);
  }
  globalThis.MandalaLegacy={decorate,itemForm};
  render=function(){
    const requested=location.hash.slice(1);
    if(requested==='sair'){$('#profile').value='Visitante';state.viewProfile='Visitante';save();location.hash='acesso';return}
    if(visitor()&&!['acesso','recuperar-senha'].includes(requested)){location.hash='acesso';return}
    if(['acesso','recuperar-senha','tcc-inicio'].includes(requested)){
      nav();$('#breadcrumb').hidden=requested!=='tcc-inicio';$('#crumb').textContent=requested==='tcc-inicio'?'TCC':'';
      if(requested==='tcc-inicio'){$('#content').innerHTML='<h1>TCC</h1><p>Você pode <a href="#tcc">cadastrar seus TCC</a> ou <a href="#entregas">entregar seus TCC</a></p>';return}
      $('#content').innerHTML=requested==='acesso'?login():`<h1>Esqueci minha senha</h1><br><p>Para criar uma nova senha, por favor forneça as seguintes informações:</p><form id="demo-recovery"><div class="legacy-form-row"><label for="reset-cpf">CPF</label><input id="reset-cpf" name="cpf" class="curto" maxlength="11"></div><div class="legacy-form-row"><label for="reset-birth">Data de nascimento</label><input id="reset-birth" name="data_nascimento" placeholder="dd/mm/aaaa" class="curto"></div><div class="legacy-form-row"><label></label><input type="submit" value="Solicitar nova senha"></div></form><p>Um e-mail com um link para troca de senha será enviado para você.</p><p class="module-note">Esta é a reprodução do formulário. O envio de e-mail ainda não está conectado.</p>`;
      $('#demo-login')?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.target);if(data.get('username')!=='aluno'||data.get('password')!=='demo'){toast('Nesta demonstração, use aluno / demo.');return}e.target.reset();$('#profile').value='Aluno';state.viewProfile='Aluno';save();location.hash='painel';});
      $('#demo-recovery')?.addEventListener('submit',e=>{e.preventDefault();e.target.reset();toast('Recuperação de senha ainda não conectada. Nenhum e-mail foi enviado.')});return;
    }
    if(requested==='painel'&&$('#profile').value==='Secretaria')active='estudantes';
    existingRender();if(!aluno()){decorate();styleFields()}
    $('#nav').querySelectorAll('a').forEach(a=>{const key=a.hash.slice(1);if(!modules[key]&&!['painel','relatorios','configuracoes','perfil','entregas','tcc-inicio'].includes(key))a.onclick=e=>{e.preventDefault();toast('Esta tela do legado ainda precisa ser reconstruída.');}});
  };
  if(state.viewProfile&&[...$('#profile').options].some(o=>o.value===state.viewProfile))$('#profile').value=state.viewProfile;
  else $('#profile').value='Visitante';
  render();
})();
