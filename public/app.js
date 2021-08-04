const ulArea = $(".task-list")

init()

function init() {
    getDate();
    getTaskItem();
    addEventListenerToXBtn();
    addEventListenerToAddTaskBtn();
}

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

// get tasks list item
async function getTaskItem() {
    const result = await fetch('http://localhost:4000/api/task')
    const data = await result.json()
    for (let i of data) {
        createAndAppendDivTask(i.task_id, i.task_name)
    }
}

// event listener on remove btn
function addEventListenerToXBtn() {
    ulArea.on('click', (e) => {
        const isXBtn = e.target.getAttribute('class') === 'remove-btn'
        const divId = e.target.getAttribute('id')
        if (isXBtn) {
            const btnId = e.target.getAttribute('id') 
            if (btnId === divId) {
                $(`#${divId}`).hide()
            }   
        }
        
        // also delete data in database?
    })
}


// event listener on add task btn
function addEventListenerToAddTaskBtn() {
    $('#add-task-btn').on('click', () => {
        const textInput = $('#task-name').val()
        
        // add to Database?

        ////////////

        let lastTaskId = ulArea.children().last().attr('id')
        lastTaskId++;
        createAndAppendDivTask(lastTaskId, textInput)
    })
}


// add event listen to check box to strike thru text --> handled by css
// function addEventListenerToBox() {
//     ulArea.on('click', (e) => {
//         const isCheckBox = e.target.getAttribute('type') === 'checkbox'
//         if (isCheckBox) {
//             const boxId = e.target.getAttribute('id') 
//             console.log(boxId)
//             if ( $(`#${boxId}`).prop("checked")) {
//                 console.log("Checkbox is checked.");
//             } else  {
//                 console.log("checkbox is NOT checked")
//             }
//         }
//     })
// }


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
    $('.title-name').text(`Happy ${weekDay}`)
}
