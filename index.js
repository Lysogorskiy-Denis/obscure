const todoOnPage = 5;
let nowPage = 1;

$(document).ready(function() {
  const $todoBTN = $("#todoBtn");
  const $todoInput = $("#todoInput");
  const $DltCTasks = $("#DeleteCTasks");
  const $dltAll = $("#deleteAll");
  let $btnSelect = $("#checkbox");
  let mass = [];

  $dltAll.on("click", function() {
    mass = [];
    render()

  });

  $DltCTasks.on("click", function() {
    mass = mass.filter(function(item) {
      return !item.checked;
    });
    render();
  });

  $todoBTN.on("click", function() {
    AddListTask();
  });

  function AddListTask() {
    const text = $todoInput.val().trim();
    const newTodo = {
      text: text.trim(),
      checked: false,
      id: Date.now()
    };
    if (text == "") return;
    mass.push(newTodo);
    $todoInput.prop("value","")
    render();
  }

  $(document).on(`dblclick`, `.text-todo`, function() {
    $(this).replaceWith(`<input type="text.val" 
                            id="newText"
                            class="new-input"
                            value="${$(this).text()}"/>`);
  });

  $(document).on("keypress", `.new-input`, function(ent) {
    if (ent.which == 13) {
      let id = $(this)
        .parent()
        .attr(`id`);
      let newText = $(this)
        .val()
        .trim();
      mass.forEach(item => {
        if (id == item.id) {
          if (newText !== "") {
            item.text = newText;
          }
        }
      });
      render();
    }
  });

  function render() {
    countTrue()
    const isEveryChecked = mass.every(function(item){return item.checked});
    $('#checkbox-all').prop('checked', isEveryChecked);
    let howMachPage = Math.ceil(mass.length/todoOnPage)
    if(howMachPage<1) howMachPage = 1;
    $(`#pagination`).html("");

    if(howMachPage>1){

      let stringPagination = "<button id=left> < </button>";
      for(i=1;i<=howMachPage;++i){
        stringPagination += `
        <button id=${i} class=pgntn >${i} </button>`

      }
      stringPagination +=" <button id=right> > </button>"
      $(`#pagination`).html(stringPagination);
    }
    
    let str = "";
    if(howMachPage<nowPage){
      nowPage=howMachPage
    }

    mass.forEach((item, i) => {
      if(((nowPage-1)*todoOnPage)<=i && i<(nowPage*5)){
        str += `
              <li id="${item.id}">
                  <input 
                      type="checkbox" 
                      class="check-todo" 
                      ${item.checked ? "checked" : ""} 
                  >
                  <span class="text-todo">${item.text}</span>
                  <button class="delete-td">X</button>
              </li>`;
      }
    });

    $(`#out-todo`).html(str);

  }
  $(document).on(`click`, '#left', function(){
    
  if( nowPage > 1) --nowPage;
  console.log(nowPage)
  render()
  })

  $(document).on(`click`, '#right', function(){
    ++nowPage;
    render()
    })
  

  $(document).on(`click`, '.pgntn', function(){

    nowPage = $(this).attr(`id`);
    render();
  })


  $(document).on(`change`, `.check-todo`, function() {
    let a = $(this)
      .parent()
      .attr(`id`);
    mass.forEach(item => {
      if (a == item.id) {
        item.checked = !item.checked;
      }
    });
    render()

  });

  $(document).on("click", ".delete-td", function() {
    let b = $(this)
      .parent()
      .attr(`id`);
    mass.forEach((item, index) => {
      if (b == item.id) {
        mass.splice(index, 1);
      }
      render();
    });
  });
  $(`#todoInput`).on("keypress", function(ent) {
    if (ent.which == 13) {
      AddListTask();
    }
  });

  $("#checkbox-all").on("change", function() {
    let check =  $("#checkbox-all").prop(`checked`);
    mass.forEach((item) => {
    item.checked = check
})
render();
})


function countTrue() {
  let complete = mass.filter(item => item.checked===true)
  lengthTrue = complete.length
  $("#completeTrue").html(lengthTrue)
  
  let notDone = mass.length - lengthTrue
  $("#completeFalse").html(notDone)

}

//function render(complete) { 
  //  complete.forEach(()=>{})
 //  }

})