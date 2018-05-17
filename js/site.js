window.addEventListener('DOMContentLoaded', function() {

	let needAuthModal = new Modal(document.getElementById('need-auth-modal')),
		$requestNewModal = document.getElementById('request-new-modal'),
		$requestNewModalForm = $requestNewModal.querySelector('form'),
		requestNewModal = new Modal($requestNewModal);

	//needAuthModal.show();
	document.getElementById('request-new-btn').addEventListener('click', function() {
		requestNewModal.show();
	});
	
	$requestNewModalForm.addEventListener('submit', function(e) {
		e.preventDefault();
		let emailVal = this.querySelector('.form-control[name="request-email"]').value,
			accountTypeVal = this.querySelector('.form-control[name="request-account-type"]').value,
			loginVal = this.querySelector('.form-control[name="request-login"]').value;
		postAjax('/subscription', { email: emailVal, acount_type: accountTypeVal, login: loginVal }, function(responseJSON) {
			/* const responseData = JSON.parse(responseJSON);
			if (responseData.succesful) {
				swal('Success!', responseData.message, 'success');
				requestNewModal.hide();
				$requestNewModalForm.reset();
			} else {
				swal('Sorry...', responseData.message, 'warning');
			} */
			swal('Success!', 'Thank you!', 'success');
			requestNewModal.hide();
			$requestNewModalForm.reset();
		});
	});
	
	/*const subscriptionForm = document.getElementById('subscription');
	if (subscriptionForm) {
		subscriptionForm.addEventListener('submit', function(e) {
			e.preventDefault();
			const name = e.target[1].value;
			const email = e.target[2].value;
			postAjax('/subscription', { name: name, email: email }, function(responseJSON) {
				const responseData = JSON.parse(responseJSON);
				if (responseData.succesful) {
					swal('Готово!', responseData.message, 'success');
					document.getElementById('subscribe-modal').style.display = 'none';
					subscriptionForm.reset();
				} else {
					swal('Извините...', responseData.message, 'warning');
				}
			});
		});
	}*/
	
	let $projectDetail = document.getElementById('project-detail');
	let $projectDetailBtns = document.getElementsByClassName('project-detail-btn');
	for (let i=0; i < $projectDetailBtns.length; i++) {
		$projectDetailBtns[i].addEventListener('click', function(e) {
			e.preventDefault();
			$projectDetail.style.display = 'block';
		});
	}
	
});

function postAjax(url, data, success) {
	let params = typeof data == 'string' ? data : Object.keys(data).map(
		function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
	).join('&');
	/* let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xhr.open('POST', url);
	xhr.onreadystatechange = function() {
		if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
	};
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(params);
	return xhr; */
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open('GET', 'https://realtcrm.com/request?' + params, true);
	xhr.onload = function() {
		console.log( this );
		console.log( this.responseText );
		success(this.responseText);
	}
	xhr.onerror = function() {
		console.error('Error', this.status);
		if (this.status == 0) success();
	}
	xhr.send();
}