export function throttle(callback: ()=> void) {
    let run = false;
    return function () {
        if (!run) {
            callback();
            run = true;
            setTimeout(() => {
                run = false;
            }, 2000);
        }
    };
}
