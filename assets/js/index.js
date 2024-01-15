$("#add_user").submit(function(event){
    alert("User Created Successfully!")
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array=$(this).serializeArray();
     var data={}
    $.map(unindexed_array,function (n,i) {
        data[n["name"]]=n["value"]
    })

    console.log(data)
    var request={
        "url":`http://localhost:3000/api/users/${data.id}`,
        "method":"PUT",
        "data":data
    }

    $.ajax(request).done(function(response){
        alert("data updated successfully")
    })

})

$(document).on("click", ".table tbody td a.delete", function() {
    var id = $(this).data("id"); 

    var request = {
        "url": `http://localhost:3000/api/users/${id}`,
        "method": "DELETE"
    };

    if (confirm("Do you really want to delete this record")) {
        $.ajax(request).done(function(response) {
            alert("Data deleted successfully");
            location.reload();
        });
    }
});

// Search jquery
$(document).ready(function () {
    // When the user types in the search box
    $("#name-search").on("keyup", function () {
        var searchText = $(this).val().toLowerCase();

        // Loop through each table row
        $("table tbody tr").each(function () {
            var id = $(this).find("td:eq(0)").text().toLowerCase();
            var userName = $(this).find("td:eq(1)").text().toLowerCase(); 
            var email = $(this).find("td:eq(2)").text().toLowerCase(); 
            if (userName.includes(searchText)) {
                $(this).show();
            }else if(id.includes(searchText)){
                $(this).show();
            }else if(email.includes(searchText)){
                $(this).show();
            }else{
                $(this).hide();
            }
        });
    });
});
