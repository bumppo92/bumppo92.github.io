let switchers = document.body.querySelectorAll('.span-switcher');
let len = switchers.length;
for (let i = 0; i < len; i++) {
    switchers[i].addEventListener('click', (event) => {
        let target = event.target.parentElement;

        if (target.hasAttribute('data-app-switch-disabled') && target.getAttribute('data-app-switch-disabled') === '1') {
            //just do nothing
        } else {
            //if not disabled 
            let id = target.getAttribute('id');
            let contrids = target.getAttribute('data-app-switch-contra').split(',');
            if (id !== null) {
                Lib.q(('#$id'.replace('$id', id))).dispatchEvent(new CustomEvent('toggle', { detail: 'toggle' }));
            }
            for (let i = 0, len = contrids.length; i < len; i++) {
                if (contrids[i] !== null && contrids[i] !== '#') {
                    Lib.q(('#$cid'.replace('$cid', contrids[i]))).dispatchEvent(new CustomEvent('toggle', { detail: 'toggle' }));
                }
            }
        }

    });

    switchers[i].addEventListener('off', (event) => {
        let target = event.target;
        let linked = target.getAttribute('data-app-linked-inputs').split(',');
        //disable inputs
        for (let i = 0, len = linked.length; i < len; i++) {
            let selector = '[data-app-reference="#ref"]'.replace("#ref", linked[i]);
            Lib.q(selector).disabled = true;
        }
        //visual flag change
        target.children[0].style.display = "flex";
        target.children[1].style.display = "none";
    });
    switchers[i].addEventListener('on', (event) => {
        let target = event.target;
        let linked = target.getAttribute('data-app-linked-inputs').split(',');
        //enable inputs
        for (let i = 0, len = linked.length; i < len; i++) {
            let selector = '[data-app-reference="#ref"]'.replace("#ref", linked[i]);
            Lib.q(selector).disabled = false;
        }
        //visual flag change
        target.children[0].style.display = "none";
        target.children[1].style.display = "flex";
    });
}