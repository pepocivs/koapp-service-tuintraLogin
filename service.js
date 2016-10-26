angular
  .module('king.services.tuintralogin', [])
  .run(['configService', 'structureHooks', function(configService, structureHooks) {
    var config = {};
    var moduleFiles = {};
    var defaultUrl = '/login';
    var module = {};
    if (configService.services && configService.services.tuintralogin) {
      console.info('[V] Loading tuintra\'s login...');
      config      = configService.services.tuintralogin.scope;
      moduleFiles = configService.services.tuintralogin.module;
      load();
    }

    function load() {
      structureHooks.setIndex(defaultUrl);
      module[defaultUrl] = loginRegister();
      structureHooks.addModule(module);
    }

    function loginRegister() {
      return {
        name: 'Tuintra',
        identifier: 'static',
        type: 'A',
        showOn: {
          menu: false,
          market: false,
          dragDrop: false
        },
        moduleFolder: moduleFiles.moduleFolder,
        view: moduleFiles.view,
        files: [moduleFiles.controller, moduleFiles.factory],
        libs: [],
        scope: {
          'config': config
        }
      };
    }
  }]);
