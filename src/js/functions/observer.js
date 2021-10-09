export default (button, popup) => {

    let oldHref = document.location.href,
        bodyList = document.querySelector("body"),

        observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;

                    if(!location.href.includes('watch?')) {
                        button.disable();
                    } else {
                        button.enable();
                    }
                    button.close();
                    popup.hide();
                }
            });
        }),

        config = {
            childList: true,
            subtree: true
        };

    observer.observe(bodyList, config);

}
