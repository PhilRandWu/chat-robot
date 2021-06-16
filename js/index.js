(function () {
    var main = document.querySelector('main');
    var input = document.querySelector('footer input');
    var sendBtn = document.querySelector('footer button');
    // main.onscroll = function () {
    //     console.log(main.scrollTop);
    // }
    function init () {
        getvalue();
    }
    function getvalue () {
        sendBtn.onclick = function () {
            var inputValue = input.value.trim();
            if(inputValue) {
                readerHtml(inputValue);
                send(inputValue);
                // console.log(inputValue);
                input.value = '';
            }
        }
    }
    function readerHtml (inputValue) {
        var people = document.createElement('div');
        people.className = 'chat people';
        people.innerHTML = `<img src="./img/avatar.jpg" alt="">
        <div class="text">`+ inputValue +`</div>`;
        main.appendChild(people);
        scroll();
    }
    function response (data) {
        var robbot = document.createElement('div');
        robbot.className = 'chat robbot';
        robbot.innerHTML = `<img src="./img/robot.jpg" alt="">
        <div class="text">`+ data +`</div>`;
        main.appendChild(robbot);
        scroll();
    }
    function send (txt) {
        Ajax({
            method: 'post',
            url: 'https://api.hyfarsight.com/test/testRequest/robotChat',
            data: {
                txt: txt
            },
            success: function (res) {
               response(res.responseTxt)
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
    function scroll () {
       var chat = Array.prototype.slice.call(document.querySelectorAll('.chat'));
       var height = 15;
       chat.forEach(function (elem) {
            height += elem.offsetHeight + 20;
            // console.log(height, main.offsetHeight);
       })

       if(height > main.offsetHeight) {
           main.scrollTop = height - main.offsetHeight;
        //    console.log(main.scrollTop,main.scrollHeight,height - main.offsetHeight)
        //    console.log(main.offsetHeight + height - main.offsetHeight);
       }
    }
    init()
})()
