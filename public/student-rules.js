/* Regras rastreadas em Constantes.php e contadorDeComponentes.js do legado. */
globalThis.MandalaStudentRules = {
  priorities: ['NFO', 'NFE', 'NFC'],
  count(offers, selections, habilitations = 2) {
    const seen = new Set();
    const result = { distinct: 0, habilitations: Array.from({length: habilitations}, () => ({counts:[0,0,0], distinct:0, total:0})) };
    for (const offer of offers) {
      const chosen = selections[offer.id] || [];
      if (!chosen.some(Boolean) || seen.has(offer.component)) continue;
      seen.add(offer.component); result.distinct++;
      let used = false;
      result.habilitations.forEach((h, i) => {
        if (!chosen[i]) return;
        const priority = this.priorities.indexOf(offer.priorities[i]);
        if (priority < 0) return;
        h.counts[priority]++; h.total++;
        if (!used) h.distinct++;
        used = true;
      });
    }
    return result;
  },
  locked(offer, reference = '2026-10') { return !offer.integrator && offer.period <= reference; },
  range(habilitations) { return {min:20+7*(habilitations-1), max:21+8*(habilitations-1)}; },
  canDeliver(phase, version) {
    return version==='validation' ? phase>=1&&phase<=2 : version==='board' ? phase>=4&&phase<=5 : version==='final' ? phase>=7&&phase<=8 : false;
  }
};
