"use strict";

describe('alt-ambiente-url', function() {
  describe('criação', function() {
    it('deve ser criado com o tipo correto', function() {
      expect(typeof altAmbienteUrl).toBe('object');
    });
  });

  describe('getEndpoint', function() {
    it('deve retornar erro, endpoint não informado', function() {
      expect(function() {
        altAmbienteUrl.getEndpoint();
      }).toThrow(new Error('Endpoint deve ser informado.'));
    })

    it('deve retornar erro, endpoint é uma string vazia', function() {
      expect(function() {
        altAmbienteUrl.getEndpoint();
      }).toThrow(new Error('Endpoint deve ser informado.'));
    })

    it('deve retornar erro, endpoint não tem a máscara __ambiente__', function() {
      var _endpoint = 'alterdata.com.br'

      expect(function() {
        altAmbienteUrl.getEndpoint(_endpoint);
      }).toThrow(new Error('Endpoint deve ter a máscara __ambiente__ onde será inserido os sufixos de -dev, -hml ou nenhum, caso seja produção.'));
    })

    it('deve retornar o endpoint passado, não é da alterdata', function() {
      var _endpoint = 'abc.com__ambiente__/api';
      var _host = 'abc-dev.com';
      var _resultado = 'abc.com/api';
      var _location = {
        host: _host
      }

      expect(altAmbienteUrl.getEndpoint(_endpoint, _location)).toEqual(_resultado);
    })

    it('não deve retornar o endpoint, estrutura do host não é a padrão', function() {
      var _endpoint = 'alterdata.com.br__ambiente__';
      var _host = 'alterdata-dev.com.br';
      var _resultado = 'alterdata.com.br/api/alguma-coisa';
      var _location = {
        host: _host
      }

      expect(altAmbienteUrl.getEndpoint(_endpoint, _location)).toEqual(_resultado);
    })

    it('deve retornar o endpoint de dev', function() {
      var _endpoint = 'alterdata.com.br__ambiente__/api/alguma-coisa';
      var _host = '-dev.alterdata.com.br';
      var _resultado = 'alterdata.com.br-dev/api/alguma-coisa';
      var _location = {
        host: _host
      }

      expect(altAmbienteUrl.getEndpoint(_endpoint, _location)).toEqual(_resultado);
    })

    it('deve retornar o endpoint de hml', function() {
      var _endpoint = 'alterdata.com.br__ambiente__/api/alguma-coisa';
      var _host = '-hml.alterdata.com.br';
      var _resultado = 'alterdata.com.br-hml/api/alguma-coisa';
      var _location = {
        host: _host
      }

      expect(altAmbienteUrl.getEndpoint(_endpoint, _location)).toEqual(_resultado);
    })

    it('deve retornar o endpoint de prod', function() {
      var _endpoint = 'alterdata.com.br__ambiente__/api/alguma-coisa';
      var _host = 'alterdata.com.br';
      var _resultado = 'alterdata.com.br/api/alguma-coisa';
      var _location = {
        host: _host
      }

      expect(altAmbienteUrl.getEndpoint(_endpoint, _location)).toEqual(_resultado);
    })
  })
});
