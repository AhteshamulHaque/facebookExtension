// first request for showing page popup

chrome.runtime.sendMessage({ query : 'showPageAction'});


for(var i = 0; i < document.scripts.length; ++i) {

	var requiredText = document.scripts[i].innerText;

	// find the list of ids
	if( requiredText.search('InitialChatFriendsList') > -1 ) {

		var matches = requiredText.match(/\[(.*?)\]/g);
		
		var persons = JSON.parse(matches[89]);

		for(var i = 0; i < persons.length; ++i) {
			persons[i] = persons[i].split('-')[0];
		}

		var people_arr = [];

		// now make ajax request and store the data in storage
		for(var i = 0; i < persons.length; ++i) {

			$.ajax({

				url: 'https://graph.facebook.com/'+persons[i]+'/picture?width=100&height=100&redirect=false',

				dataType: 'JSON',
				context: { request_no: i, id_link: 'https://www.facebook.com/'+persons[i] },

				success: function(person_data) {

					person_data.data.id_link = this.id_link;
					people_arr.push(person_data);

					// if it is the result of the last request
					// store in the web storage
					if(this.request_no == persons.length-1) {
						chrome.storage.local.set( { 'profiles': people_arr } );
					}
				}
				
			});
		}

		break;
	}
}