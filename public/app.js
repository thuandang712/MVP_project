const ulArea = $(".task-list")

init()

function init() {
    getDate();
    getTaskItem();
    addEventListenerToXBtn();
    addEventListenerToAddTaskBtn();
}

//------------------ DATABASE CRUD ------------------//
// GET tasks list item from database
async function getTaskItem() {
    const result = await fetch('/api/task')
    const data = await result.json()
    for (let i of data) {
        createAndAppendDivTask(i.task_id, i.task_name)
    }
}

// POST task to Database
async function postTaskItem(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

// DELETE task from database
async function deleteTaskItem(url = '') {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return response.json()
}
//------------------ DATABASE CRUD ------------------//



//------------------ MAIN FUNCTIONS ------------------//
// create and append result
function createAndAppendDivTask(taskId, taskName) {
    // create task Divs
    const taskDiv = $('<div></div>').addClass('tasks').attr('id', taskId)
    // create child elements
    const input = $(`<input type='checkbox' id=box-${taskId} class='md-task'/>`)    
    const li = $('<li></li>').addClass('list-item').text(taskName)
    const divBtn = $('<div></div>').addClass('remove-btn').text('x').attr('id', taskId)
    // append results
    $(taskDiv).append(input)
    $(taskDiv).append(li)
    $(taskDiv).append(divBtn)
    ulArea.append(taskDiv)
}

// event listener on add task btn
function addEventListenerToAddTaskBtn() {
    $('#add-task-btn').on('click', () => {
        const textInput = $('#task-name').val()
        // check if user input is nothing
        if (textInput.length === 0) {
            // alert('Please enter....') ////////////////// needs fix
            $('.error').text('Oops!! Please enter item')
        } else {
            let lastTaskId = ulArea.children().last().attr('id')
            // handle case if there is nothing in the DB yet
            if (lastTaskId === undefined) {
                lastTaskId = 1;
                createAndAppendDivTask(lastTaskId, textInput)
                $('.error').hide()
                postTaskItem('/api/task', {task_name: textInput})
            } else {
                lastTaskId++;
                createAndAppendDivTask(lastTaskId, textInput)
                $('.error').hide()
                postTaskItem('/api/task', {task_name: textInput})
            }
        }
    })
}

// event listener on remove btn
function addEventListenerToXBtn() {
    ulArea.on('click', (e) => {
        const isXBtn = e.target.getAttribute('class') === 'remove-btn'
        let divId = e.target.getAttribute('id')
        if (isXBtn) {
            const btnId = e.target.getAttribute('id')
            // ??????? handle case task_id is always being incremented in the DB ??????
            divId = btnId;
            $(`#${divId}`).hide()
            // delete item
            deleteTaskItem(`/api/task/${divId}`)
        }
    })
}

// date manipulation
function getDate() { 
    const fullDate = new Date() 
    const year = fullDate.getFullYear();
    const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][fullDate.getMonth()];
    const date = fullDate.getDate();
    const weekDay = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][fullDate.getDay()];
    const formatted_date = `${month} ${date}, ${year}`
    // show formatted date
    $('.date').text(formatted_date)
    $('.title-name').text(`Enjoy your ${weekDay}`)
}
//------------------ MAIN FUNCTIONS ------------------//