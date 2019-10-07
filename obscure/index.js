$( document ).ready(function() {
    const  $todoBTN = $("#todoBtn");
    const $todoInput = $("#todoInput"); 
    let $dltTd = $("#delete-td")
    let mass = []
     
    $todoBTN.on( "click", function () {
        AddListTask()
        // const text = $todoInput.val();
        // const newTodo ={
        //     text:text,
        //     checked:false,
        //     id:Date.now(),
        // }
        // mass.push(newTodo);
        // render()
       
        // console.log(mass);
        // $(`#out-todo`).html(`<p>${text}</p>`)
    });

    function AddListTask(){
        const text = $todoInput.val().trim();
        console.log(text)
        const newTodo ={
            text:text.trim(),
            checked:false,
            id:Date.now(),
        }
        mass.push(newTodo);
        render()
    }


// доделать value
// сохранение аналогично добавлению таска
    $(document).on(`dblclick`,`.text-todo`, function (){
        //console.log(2222)
        // $("text:text").dblclick(function () {
        $(this).replaceWith(`<input type="text" 
                            class="new-input"/>`)
        console.log(this)                    
        
    })
    $(document).on('keypress',`.new-input`, function(ent) {
        console.log('here')
          if(ent.which == 13) {
           let id =  $(this).parent().attr(`id`)    
           let newText =  $(this).val().trim();  
           mass.forEach(item=>{
          if(id == item.id){
        //    newText > "0";
          if (newText !== "") {
              item.text  = newText
         }
           render() ;
         //      console.log(id)
         //  console.log(newText)
           }
        })   
        }
    });
    
     
    function render (){
                console.log(mass)
        let str = ''
        mass.forEach(item => {
            str += `
            <li id="${item.id}">
                <input 
                    type="checkbox" 
                    class="check-todo" 
                    ${item.checked ? 'checked' : ''} 
                >
                <span class="text-todo">${item.text}</span>
                <button class="delete-td">X</button>
            </li>`
            // console.log('###########')
            // console.log('item' , item.text)
            // console.log('item.id' , item.id)
            // console.log(str)
        });
        $(`#out-todo`).html(str)
        // $( ".todoInput" ).append( $( ) );
        // let $dltAdd = $("#deleteAdd")
        // $dltAdd.on( "click", function() {
        // }
    }
    $(document).on(`change`, `.check-todo`, function(){
        // console.log(mass)
       let a =  $(this).parent().attr(`id`) ;
       mass.forEach(item=>{
           if(a == item.id){
               item.checked  = !item.checked ;
            //    console.log(item.check)
           }
       })
       render() ;
    })
    $(document).on( "click", '.delete-td', function ()  {
        let b =  $(this).parent().attr(`id`) ;
    console.log('b',b)
        mass.forEach((item, index)=>{
        if(b == item.id){
            mass.splice( index , 1) ;
        }
        render()
        })     
    })
    $(`#todoInput`).on('keypress',function(ent) {
        if(ent.which == 13) {
       // mass.push(newTodo)
        AddListTask() ;
        // render() ;
        }
})
})
// })