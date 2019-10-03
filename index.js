$( document ).ready(function() {
    const  $todoBTN = $("#todoBtn");
    const $todoInput = $("#todoInput"); 
    const mass = []
     
    $todoBTN.on( "click", function() {
        const text = $todoInput.val();
        const newTodo ={
            tetx:text,
            checked:false,
            id:Date.now(),
        }
        mass.push(newTodo);
        console.log(mass);
    });

    function render (){
        const template = 
    }
});
