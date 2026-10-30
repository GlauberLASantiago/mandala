const {test}=require('node:test');
const assert=require('node:assert/strict');
require('../public/student-rules.js');
const R=globalThis.MandalaStudentRules;
test('componentes compartilhados contam nas duas habilitações e uma vez no total',()=>{
 const result=R.count([{id:'a',component:'c',priorities:['NFO','NFE']}],{a:[true,true]});
 assert.equal(result.distinct,1); assert.deepEqual(result.habilitations.map(h=>h.total),[1,1]);
 assert.deepEqual(result.habilitations.map(h=>h.distinct),[1,0]);
 assert.equal(result.habilitations[0].counts[0],1);assert.equal(result.habilitations[1].counts[1],1);
});
test('duas ofertas de um mesmo componente não duplicam a contagem',()=>{
 assert.equal(R.count([{id:'a',component:'c',priorities:['NFO','NFO']},{id:'b',component:'c',priorities:['NFO','NFO']}],{a:[true,true],b:[true,true]}).distinct,1);
});
test('bloqueia períodos passados e correntes, preservando projeto integrador',()=>{
 assert.equal(R.locked({period:'2026-09'}),true);assert.equal(R.locked({period:'2026-10'}),true);assert.equal(R.locked({period:'2026-11'}),false);assert.equal(R.locked({period:'2026-09',integrator:true}),false);
});
test('limites de componentes distintos correspondem às fórmulas do legado',()=>{
 assert.deepEqual(R.range(1),{min:20,max:21}); assert.deepEqual(R.range(2),{min:27,max:29});assert.deepEqual(R.range(3),{min:34,max:37});
});
test('aluno não pode entregar versão antes ou depois das fases permitidas',()=>{
 for(let phase=0;phase<=10;phase++){
 assert.equal(R.canDeliver(phase,'validation'),phase===1||phase===2);
 assert.equal(R.canDeliver(phase,'board'),phase===4||phase===5);
 assert.equal(R.canDeliver(phase,'final'),phase===7||phase===8);
 }
});
