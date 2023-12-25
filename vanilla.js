document.addEventListener('DOMContentLoaded', function () {

	// post request to create room on port 8001

    const createRoomForm = document.getElementById('createRoomForm');
    const loadingSpinner = document.getElementById('loading-spinner');
    const roomContainer = document.getElementById('room-container');
	const formContainer = document.getElementById('form-container');

    createRoomForm.addEventListener('submit', function (event) {
		event.preventDefault();

		// Show the loading spinner
		loadingSpinner.style.display = 'inline-block';

		// Serialize the form data
		const formData = new FormData(createRoomForm);
		const serializedFormData = {};
		formData.forEach((value, key) => {
			serializedFormData[key] = value;
		});

		// Make a POST request using the fetch API
		fetch('http://localhost:8001/create-room', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(serializedFormData),
		})
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text(); // Parse the response as text
		})
		.then(html => {
			// Replace the content of the container with the received HTML
			roomContainer.innerHTML = html;
			formContainer.style.display = 'none';
		})
		.catch(error => {
			console.error('Error creating room:', error);
		})
		.finally(() => {
			// Hide the loading spinner
			loadingSpinner.style.display = 'none';
		});
	});

});