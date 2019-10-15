/* eslint-disable linebreak-style */
$(document).ready(() => {
  const $addTodo = $('#todo-button');
  const $todoInput = $('#todo-input');
  const $deleteCompleteTasks = $('#delete-complete-tasks');
  const $deleteAll = $('#delete-all');
  const $markerTab = $('.marker');
  const $showAll = $('#show-all');
  const $checkboxAll = $('#checkbox-all');
  const TODO_ON_PAGE = 5;
  const BUTTON_ENTER = 13;

  let mainArray = [];
  let completeArray = [];
  let arrayFailed = [];
  let choiceTab = 'all';
  let nowPage = 1;
  let numberOfPages;
  let isEveryChecked;

  const countTrue = () => {
    completeArray = mainArray.filter(item => item.checked === true);
    const { length: lengthTrue } = completeArray;


    $('#complete-true').html(lengthTrue);
    arrayFailed = mainArray.filter(item => item.checked === false);
    const { length: lengthFalse } = arrayFailed;


    $('#complete-false').html(lengthFalse);
  };


  const pagination = glob => {
    numberOfPages = Math.ceil(glob.length / TODO_ON_PAGE);
    if (nowPage > numberOfPages) {
      nowPage = numberOfPages;
    }
    if (numberOfPages < 1) numberOfPages = 1;
    $('#pagination').html('');
    if (numberOfPages > 1) {
      let stringPagination = '<nav aria-label="Page navigation example ">'
+ ` <ul class="pagination">`
+ ` <li id = left class="page-item ${nowPage === 1 ? 'disabled' : ''} "> `
+ ' <a class="page-link" href="#" aria-label="Previous"> '
+ '<span aria-hidden="true">&laquo;</span></a></li>';

      for (let i = 1; i <= numberOfPages; ++i) {
        stringPagination += `
      <li id=${i} class="page-item pgntn ${i === nowPage ? 'active' : ''}">
      <a class="page-link" href="#">${i}</a></li>`;
      }
      stringPagination
      += `<li id = right 
        class="page-item ${numberOfPages === nowPage ? 'disabled' : ''}">
      <a class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;
      </span></a></li ></ul></nav>`;
      $(`#pagination`).html(stringPagination);
    }

    let str = '';

    if (numberOfPages < nowPage) {
      nowPage = numberOfPages;
    }

    glob.forEach((item, i) => {
      if ((nowPage - 1) * TODO_ON_PAGE <= i && i < nowPage * TODO_ON_PAGE) {
        str += `<tr class="middle-pag">
         <td id="${item.id}">
          <input type="checkbox" 
            class="check-todo" ${item.checked ? 'checked' : ''} />
         </td>
      <td id="${item.id}"class="middle-pag__text">
      <span class="text-todo"> 
      ${item.text}
       </span> </td>
      <td id="${item.id}" > <button class="delete-td btn btn-outline-danger"> X 
      </button></td>
      </tr>`;
      }
    });

    return str;
  };

  const render = glob => {
    if (mainArray.length) {
      isEveryChecked = mainArray.every(item => item.checked);
    } else {
      isEveryChecked = false;
    }
    $checkboxAll.prop('checked', isEveryChecked);
    $(`#out-todo`).html(pagination(glob));
  };

  const verification = () => {
    countTrue();
    if (choiceTab === 'com') {
      render(completeArray);
    } else if (choiceTab === 'laz') {
      render(arrayFailed);
    } else {
      render(mainArray);
    }
  };

  const fixText = text => text.trim()
    .replace(/&/gu, '&amp;')
    .replace(/~/gu, '')
    .replace(/"/gu, '&quot;')
    .replace(/#/gu, '')
    .replace(/</gu, '&lt;')
    .replace(/>/gu, '&gt;')
    .replace(/'/gu, '&#39;');

  const addListTask = () => {
    const text = fixText($todoInput.val());
    const newTodo = {
      checked: false,
      id: Date.now(),
      text: text.trim(),
    };

    if (text === '') return;
    mainArray.unshift(newTodo);
    $todoInput.prop('value', '');
    verification();
  };

  $deleteAll.on('click', () => {
    mainArray = [];
    verification();
  });

  $deleteCompleteTasks.on('click', () => {
    mainArray = mainArray.filter(item => !item.checked);
    verification();
  });

  const colorChange = function() {
    $markerTab.addClass('btn-success');
    $markerTab.removeClass('btn-warning');
  };


  $addTodo.on('click', () => {
    nowPage = 1;
    choiceTab = 'all';
    addListTask();
    colorChange();
    $showAll.removeClass('btn-success')
      .addClass('btn-warning');
    verification();
  });

  $(document).on(`dblclick`, `.text-todo`, function() {
    $(this).replaceWith(`<input type="text.val" 
                            id="newText"
                            class="new-input form-control"
                            value="${$(this).text()}"/>`);
    $('#newText').focus();
    $(document).on('blur', `.new-input`, function(blurFun) {
      blurFun.which = BUTTON_ENTER;
      const id = parseInt($(this).parent()
        .attr(`id`));
      const newText = fixText($(this).val());

      mainArray.forEach(item => {
        if (id === item.id) {
          if (newText !== '') {
            item.text = newText;
          }
        }
      });
      verification();
    });
  });


  $(document).on('keypress', `.new-input`, function(ent) {
    if (ent.which === BUTTON_ENTER) {
      const id = parseInt($(this).parent()
        .attr(`id`));
      const newText = fixText($(this).val());

      mainArray.forEach(item => {
        if (id === item.id) {
          if (newText !== '') {
            item.text = newText;
          }
        }
      });
      verification();
    }
  });


  $(document).on(`click`, '#left', () => {
    if (nowPage > 1) --nowPage;
    verification();
  });

  $(document).on(`click`, '#right', () => {
    if (nowPage < numberOfPages) ++nowPage;
    verification();
  });

  $(document).on(`click`, '.pgntn', function() {
    nowPage = parseInt($(this).attr(`id`));

    verification();
  });

  $(document).on(`change`, `.check-todo`, function() {
    const changeCheck = parseInt($(this).parent()
      .attr(`id`));


    mainArray.forEach(item => {
      if (changeCheck === item.id) {
        item.checked = !item.checked;
      }
    });
    verification();
  });

  $(document).on('click', '.delete-td', function() {
    const clickDelete = parseInt($(this).parent()
      .attr(`id`));


    mainArray.forEach((item, index) => {
      if (clickDelete === item.id) {
        mainArray.splice(index, 1);
      }
      if (nowPage > numberOfPages) {
        nowPage = numberOfPages;
      }
      verification();
    });
  });

  $todoInput.on('keypress', ent => {
    if (ent.which === BUTTON_ENTER) {
      nowPage = 1;
      choiceTab = 'all';
      addListTask();
      colorChange();
      $showAll.removeClass('btn-success')
        .addClass('btn-warning');
      verification();
    }
  });

  $checkboxAll.on('change', () => {
    const check = $checkboxAll.prop(`checked`);


    mainArray.forEach(item => {
      item.checked = check;
    });
    nowPage = 1;
    verification();
  });

  const marking = function(thisButton) {
    colorChange();
    thisButton.removeClass('btn-success').addClass('btn-warning');
  };

  $(document).on('click', '#button-complete-true', function() {
    marking($(this));
    choiceTab = 'com';
    if (nowPage === 0) nowPage = 1;
    verification();
  });

  $(document).on('click', '#button-complete-false', function() {
    if (nowPage === 0) nowPage = 1;
    choiceTab = 'laz';
    marking($(this));
    verification();
  });

  $(document).on('click', '#show-all', function() {
    if (nowPage === 0) nowPage = 1;
    choiceTab = 'all';
    marking($(this));
    verification();
  });
});
