"use strict";

var altAmbienteUrl = (function() {
  return {
    getEndpoint: getEndpoint
  };

  function getEndpoint(endpoint, loc) {
    var _loc = loc || location;
    var _host = _loc.host;

    if (!endpoint || !endpoint.length) {
      throw new Error('Endpoint deve ser informado.');
    }

    if (!/__ambiente__/.test(endpoint)) {
      throw new Error('Endpoint deve ter a máscara __ambiente__ onde será inserido os sufixos de -dev, -hml ou nenhum, caso seja produção.');
    }

    if (/-dev\.alterdata\.com\.br/.test(_host)) {
      return endpoint.replace(/__ambiente__/, '-dev');
    }

    if (/-hml\.alterdata\.com\.br/.test(_host)) {
      return endpoint.replace(/__ambiente__/, '-hml');
    }

    return endpoint.replace(/__ambiente__/, '');
  }
}());
