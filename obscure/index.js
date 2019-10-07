$( document ).ready(function() {
    const  $todoBTN = $("#todoBtn");
    const $todoInput = $("#todoInput"); 
    const $DltCTasks = $("#DeleteCTasks")
    const $dltAll = $("#deleteAll")
    let mass = []

$dltAll.on("click", function () {
        mass.length = 0
        render()
})
     
$DltCTasks.on( "click", function (){
mass = mass.filter(function(item){
    return !item.checked;
})   
render()
})

    $todoBTN.on( "click", function () {
        AddListTask()
});

    function AddListTask(){
        const text = $todoInput.val().trim();
        console.log(text)
        const newTodo ={
            text:text.trim(), 
            checked:false,
            id:Date.now(),
        }
        if (text == "")
        return
        mass.push(newTodo);
render()
}
 
$(document).on(`dblclick`,`.text-todo`, function (){
    $(this).replaceWith(`<input type="text" 
                            class="new-input"/>`)
})

$(document).on('keypress',`.new-input`, function(ent) {
          if(ent.which == 13) {
           let id =  $(this).parent().attr(`id`)    
           let newText =  $(this).val().trim();  
           mass.forEach(item=>{
          if(id == item.id){
          if (newText !== "") {
              item.text  = newText
}
render() ;
}
})   
}
});
    
    function render (){
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
});
$(`#out-todo`).html(str)
}

$(document).on(`change`, `.check-todo`, function(){
       let a =  $(this).parent().attr(`id`) ;
       mass.forEach(item=>{
           if(a == item.id){
               item.checked  = !item.checked ;
           }
})
render() ;
})

$(document).on( "click", '.delete-td', function ()  {
        let b =  $(this).parent().attr(`id`) ;
        mass.forEach((item, index)=>{
        if(b == item.id){
            mass.splice( index , 1) ;
        }
        render()
})     
})
    $(`#todoInput`).on('keypress',function(ent) {
        if(ent.which == 13) {
        AddListTask() ;
        }    
})
})