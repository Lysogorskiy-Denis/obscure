$( document ).ready(function() {
    const  $todoBTN = $("#todoBtn");
    const $todoInput = $("#todoInput"); 
    let $dltTd = $("#delete-td")
    let mass = []
     
    $todoBTN.on( "click", function(ent) {
        const text = $todoInput.val();
        const newTodo ={
            text:text,
            checked:false,
            id:Date.now(),
        }
        mass.push(newTodo);
        render()
        // console.log(mass);
        // $(`#out-todo`).html(`<p>${text}</p>`)
    });

    function render (){
                console.log(mass)

        let str = ''
        mass.forEach(item => {
            str += `<li id="${item.id}"><input type="checkbox" class="check-todo" ${item.checked ? 'checked' : ''} >${item.text}<button class="delete-td">X</button></li>`
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
    
    $(document).on( "click", '.delete-td', function()  {
        let b =  $(this).parent().attr(`id`) ;
    console.log('b',b)
        mass.forEach((item, index)=>{
        if(b == item.id){
            mass.splice( index , 1) ;
        }
        render()
        })     
    })

    
    $(document).on('keypress',function(e) {
        if(e.which == 13) {
        mass.push(newTodo);
        render()
        }
        })

        
    });
})
