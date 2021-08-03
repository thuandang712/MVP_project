const ulArea = $(".task-list")

init()

function init() {
    getTaskItem()
    addEventListenerToXBtn();
    addEventListenerToAddTaskBtn();
}

// function create and append result
function createAndAppendDivTask(taskId, taskName) {
    // create task Divs
    const taskDiv = $('<div></div>').addClass('tasks').attr('id', taskId)
    // create child elements
    const input = $("<input type='checkbox' class='md-task'/>")    
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
        // console.log(lastTaskId) 
        lastTaskId++;

        createAndAppendDivTask(lastTaskId, textInput)
    })

}


// add event listen to box
// function addEventListenerToBox() {
//     $("input[type='checkbox']").change( (e) => {
//         console.log('working')
//         // console.log(e)
//         if(this.checked) {
//             console.log('workingeeee')
//         }
//     });
// }
