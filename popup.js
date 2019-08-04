// <div class="item">
// 	<div class="ui tiny image">
// 		<img src="/images/wireframe/image.png">
// 	</div>
// 	<div class="middle aligned content">
// 		<a class="header">12 Years a Slave</a>
// 	</div>
// </div>

$(document).ready( function() {

	var profile_div = document.getElementById('profile-div');
	profile_div.innerHTML = '';

	chrome.storage.local.get('profiles', function(data) {

		try {
			for(var i = 0; i < data.profiles.length; ++i) {

				if(i == 0) {
					$("#loading").remove();
					$("#seeAll").removeClass('disabled');
				}

				profile_div.innerHTML += 
				'<div class="item" style = "margin: 0 !important">' +
					'<div class="ui tiny image" style = "margin: 0 !important">' +
						'<img src = "avatar.png" data-src="'+ data.profiles[i].data.url +'">' +
					'</div>' +
					'<div class="middle aligned content" style = "margin: 0 !important">' +
						'<a href = "' + data.profiles[i].data.id_link + '" class="header">See Profile</a>' +
					'</div>' +
				'</div>';
			}

		} catch(e) {

		}

		$("a[href]").click( function() {
			chrome.tabs.create({
				url: $(this).attr('href'),
				active: false
			});
		});

		$("#description").scroll(function() {
			$('.ui.items img')
				.visibility({
					type       : 'image',
					transition : 'fade in',
					duration   : 1000
			});
	  });

		$('.ui.items img')
			.visibility({
				type       : 'image',
				transition : 'fade in',
				duration   : 1000
		});

	});

});