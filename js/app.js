(function (){

    var model = {
        data:  [
            {
                name: 'Sylvester',
                clickCount: 0,
                img_url: "img/blauw-oogje_768.jpg",
                img_thumb: "img/blauw-oogje_150.jpg",
            },
            {
                name: 'Tiger',
                clickCount: 0,
                img_url: "img/tabby-cat-dark-background_768.jpg",
                img_thumb: "img/tabby-cat-dark-background_150.jpg",
            },
            {
                name: 'Snow',
                clickCount: 0,
                img_url: "img/odd-eyed-kitten_768.jpg",
                img_thumb: "img/odd-eyed-kitten_150.jpg",
            },
            {
                name: 'Tabby',
                clickCount: 0,
                img_url: "img/tabby-kitten_768.jpg",
                img_thumb: "img/tabby-kitten_150.jpg",
            },
            {
                name: 'Kitty',
                clickCount: 0,
                img_url: "img/why-do-you-ask_768.jpg",
                img_thumb: "img/why-do-you-ask_150.jpg",
            },
            {
                name: 'Grumpy',
                clickCount: 0,
                img_url: "img/kruimel_768.jpg",
                img_thumb: "img/kruimel_150.jpg",
            },

        ],
        currentCat: 0,
        showForm: false,

    };


    var controller = {
        init: function() {
            view_list.render();

            view_display.init();
        },
        getLength: function(){
            return model.data.length;
        },
        getCurrentCat: function(){
            return model.currentCat;
        },
        getName: function(i){
            return model.data[i].name;
        },
        getCounter: function(i){
            return model.data[i].clickCount;
        },
        getURL: function(i){
            return model.data[i].img_url;
        },
        getThumbURL: function(i){
            return model.data[i].img_thumb;
        },
        updateCurrentCat: function(newCat){
            model.currentCat = newCat;
        },
        incrementCounter: function(i){
            model.data[i].clickCount += 1;
        },

        updateName: function(i){
            var newName = document.getElementById("new-name").value;
            /*check if the string is not empty*/
            if (newName !== '' && (typeof newName === 'string' || newName instanceof String)){
                model.data[i].name = newName;
            }

        },
        updateClicksNo: function(i){
            var inputN = document.getElementById("new-click-no").value;
            var newCount = Math.floor(inputN);
            if (isNaN(newCount) == false && newCount < 1000){
                model.data[i].clickCount = newCount;
            }
        },
        isFormVisible: function(){
            return model.showForm;
        },
        SetFormVisibility: function(flag){
            model.showForm = flag;
        },



    };

    var view_list = {
        render: function(){
            /*changes the names on the cat list*/
            this.ul = document.getElementById("cat-list");
            var len = controller.getLength();
            /*empty the list*/
            this.ul.innerHTML = '';

            for (var i = 0; i < len ; i++) {
                var li = document.createElement('li');
                li.setAttribute ('id', (i).toString() );

                /*add event listener*/
                li.addEventListener('click', (function(num) {
                    return function() {

                        controller.updateCurrentCat(num);
                        view_display.render();
                    };
                })(i));

                /*add element to the list */
                this.ul.appendChild(li);
                this.createList(i);
            }
        },

        createList: function(i){
            var li = document.getElementById(i.toString().slice(0,1));
            if (li !== null){
                li.innerHTML = '';
            }
            br = '<br>'

            var a = document.createElement('div');
            a.setAttribute('href','');
            li.appendChild(a);
            a.innerHTML= controller.getName(i) + br;

            /*append thumbnail*/
            var thumb = document.createElement('img');
            thumb.setAttribute('src', controller.getThumbURL(i));
            thumb.setAttribute('class', 'list-thumb');
            a.appendChild(thumb);
        }



    };

    var view_display = {
        init: function(){
            this.h2 = document.getElementById('cat-name');
            this.elem = document.getElementById('cat_img');
            this.curCat = controller.getCurrentCat();


            /*attach an event handler to the image to increment the counter*/
            this.elem.addEventListener('click', function(){
                var curCat = controller.getCurrentCat();
                controller.incrementCounter(controller.getCurrentCat());
                view_display.renderCounter();
            });

             /*update display area*/
            this.render();


            /*attach an event handler to the button admin to trigger the display of the form*/
            var btn = document.getElementById('admin-button');
            btn.addEventListener('click', function(){
                view_display.toggleFormDisplay(!controller.isFormVisible());
            });

            /*attach an event handler to the button "cancel" to trigger the display of the form*/
             view_display.submitFormValues();

        },

        renderCounter: function(){
            /*update the click counter*/
            var textField = document.getElementById('show-counter');
            textField.textContent = controller.getCounter(this.curCat);
        },

        render: function(){
            /*update current cat*/
            this.curCat = controller.getCurrentCat();

            /*update the cat image*/
            try {
                this.elem.setAttribute('src', controller.getURL(this.curCat));
            }
            catch(error){
                alert("Please insert a valid url");
            }

            /*update the displayed name*/
            this.h2.textContent = controller.getName(this.curCat);

            /*update the click counter*/
            this.renderCounter();

        },

        toggleFormDisplay: function(flag){
            this.form = document.getElementsByClassName('admin-form')[0];
            var overlay = document.getElementById("overlay");

            /*make the form visible*/
            if (flag == true){
                this.form.style.display = 'block';
                controller.SetFormVisibility = true;
                overlay.style.display = "block";
            }
            else{
                this.form.style.display = 'none';
                controller.SetFormVisibility = false;
                overlay.style.display = "none";
            }
        },

        submitFormValues: function() {
            if (controller.isFormVisible){
                var btnCancel = document.getElementById('admin-cancel');

                btnCancel.addEventListener('click', function(){
                    this.form.reset(); /*clean the form*/
                    view_display.toggleFormDisplay(false);

                });

                var btnSubmit = document.getElementById("admin-submit");

                btnSubmit.addEventListener('click', function(){
                    var curCat = controller.getCurrentCat();
                    controller.updateName(curCat);
                    controller.updateClicksNo(curCat);
                    view_list.createList(curCat);
                    view_display.render();
                    this.form.reset(); /*clean the form*/
                    view_display.toggleFormDisplay();
                });
            }
        },
    };



    controller.init();




}) ();



