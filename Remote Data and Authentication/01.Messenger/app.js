function attachEvents() {
    document.getElementById('submit').addEventListener('click', submitMessage);
    document.getElementById('refresh').addEventListener('click', getAllData);

    const nameElm = document.querySelector('input[name="author"]');
    const messageElm = document.querySelector('input[name="content"]');
    const messagesTextArea = document.getElementById('messages');

    function submitMessage() {
        const dataToSend = {
            author: nameElm.value,
            content: messageElm.value
        };

        if (dataToSend.author !== '' && dataToSend.content !== '') {
            fetch('http://localhost:3030/jsonstore/messenger', {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });
        }

        nameElm.value = '';
        messageElm.value = '';
    }

    async function getAllData() {
        const response = await fetch('http://localhost:3030/jsonstore/messenger');
        const output = await (response.ok === true ? response.json() : 'Error in server response');
        let outputData = [...Object.values(output)];

        let text = '';
        outputData.map(item => {
            text += `${item.author}: ${item.content}\n`;
        });
        text = text.trimEnd();
        messagesTextArea.textContent = text;
    }
    
}


attachEvents();