window.getTemplate = function (name) {
    'use strict';
    if (this.templates === undefined || this.templates[name] === undefined) {
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests#Example.3A_HTTP_synchronous_request
        var req = new XMLHttpRequest();
        req.open('GET', 'templates/' + name, false);
        req.send(null);
        if (this.templates === undefined) {
            this.templates = {};
        }
        this.templates[name] = this.compile(req.responseText);
    }
    return this.templates[name];
};

(function (win, doc) {
    'use strict';

    // Template engine
    var Handlebars = win.Handlebars;
    var getTemplate = win.getTemplate;

    // Model
    var dados = {
        'title': 'Awesome',
        'users': [{'name': 'Lagden'}, {'name': 'Sabrina'}, {'name': 'Lucas'}]
    };

    // View
    var templates = {
        'demo': getTemplate.call(Handlebars, 'demo.hbs'), // precompilado
        'outro': getTemplate.call(Handlebars, 'outro.hbs') // compilado via ajax
    };

    // Controller
    // https://developer.mozilla.org/en-US/docs/Web/API/element.insertAdjacentHTML
    var el = doc.getElementById('putDados');
    el.insertAdjacentHTML('afterbegin', templates.demo(dados));
    el.insertAdjacentHTML('beforeend', templates.outro(dados));

})(window, document);