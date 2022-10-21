function resizeTextArea() {
    let textarea = document.getElementById("wordHolder");
        if(textarea){
            textarea.style.height = "0px";
            textarea.style.height = textarea.scrollHeight + 'px';
    }
}

export default resizeTextArea;