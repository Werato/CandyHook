file = {

    form: $(".FileWrapper"),

    fileCount: 0,

    parent: function (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    },
  
    getContentFromFrame: function (target) {
        var linkedFrame = document.getElementById('hiddenframe'),
            content = linkedFrame.contentWindow.document.body.innerHTML;

        if (content === null || content == "")
            return false;

        //target[target.length - 1].innerHTML = "<img src=" + content + " />";
        target[target.length - 1].style.backgroundImage = "url('"+content+"')";

    },

    cloneElement: function (target) {
        if (target[target.length - 1].style.backgroundImage != "")
            target[target.length - 1].outerHTML += "<div class=\"UnloadImg\"></div>";
    },

    multy: function (e) {
        var ImgBlock = document.getElementsByClassName("UnloadImg");
        this.cloneElement(ImgBlock);
        this.getContentFromFrame(ImgBlock)
    },
}

