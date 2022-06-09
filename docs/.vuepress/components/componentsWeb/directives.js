export default {
    install(Vue) {
        Vue.directive("floatNumber", {
            inserted(el, binding, vNode) {
                let regExp = /[^0-9.]/g;
                el.handler = (e) => {
                    let index = e.target.value.indexOf(".");
                    let prefix = "";
                    let inputValue = "";
                    if (index === -1) {
                        inputValue = String(Number(e.target.value));
                    } else {
                        if (e.target.value.match(/^(\.|-\.)/)) {
                            prefix = "0";
                        }
                        inputValue =
                            prefix +
                            e.target.value.slice(0, index + 1) +
                            e.target.value
                                .slice(index)
                                .replace(/\./g, "")
                                .slice(0, binding.value);
                    }
                    const inputMaxlength = Number(vNode.data.attrs.maxlength);
                    let totalLength = inputMaxlength + binding.value + 1;
                    e.target.value = inputValue.replace(regExp, "");
                    if (e.target.value.indexOf(".") !== -1) {
                        if (e.target.value.length > totalLength) {
                            e.target.value = String(e.target.value).substring(
                                0,
                                e.target.value.length - 1
                            );
                        }
                    } else {
                        if (e.target.value.length > inputMaxlength) {
                            e.target.value = String(e.target.value).substring(
                                0,
                                e.target.value.length - 1
                            );
                        }
                    }
                    const eve = document.createEvent("HTMLEvents");
                    eve.initEvent("input", true, true);
                    vNode.tag === "input"
                        ? el.dispatchEvent(eve)
                        : el.querySelector("input").dispatchEvent(eve);
                };
                el.addEventListener("keyup", el.handler);
            },
            unbind(el) {
                el.removeEventListener("keyup", el.handler);
            },
        });
    },
}
