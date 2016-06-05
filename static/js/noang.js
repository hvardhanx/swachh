var map;
function initMap() {
  var myLatLng  = {lat: 23.35, lng: 85.334}; 
  //var myLatLngA = [{lat: 23.35, lng: 85.334, count:1}, {lat: 23.3493562, lng: 85.3151996,  count:1}, {lat: 23.338562, lng: 85.317996,  count:1}];
  map = new google.maps.Map(document.getElementById('map'), {
  center: myLatLng,
  zoom: 15
  });
  $(document).ready(function(){
    $.ajax({
      method: 'GET',
      dataType: 'json',
      url: "//172.16.16.57:3000/corp/data",
      success: function(data){
        res = data.report;
        console.log("report: " + res);
        var marker = [];
        for(i = 0; i < res.length; ++i){
          console.log("res: " + res[i].lat);
          marker[i] = new google.maps.Marker({
              position: new google.maps.LatLng(res[i].lat, res[i].long),
              map: map,
              icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+res[i].data.length+'|FE6256|000000'
            });
          google.maps.event.addListener(marker[i], 'click', callNumber);  
        }
      }
    });
  });
}
  function callNumber() {
    images_fn(this.position.toUrlValue());
  }
    function images_fn(loc) {      
    console.log(loc);
      loc = loc.split(",");
      lat = loc[0];
      lng = loc[1];
      $.ajax({
        method: 'POST',
        dataType: 'json',
        url: "//172.16.16.57:3000/corp/getData",        
        data: {lat:lat, long: lng},
        success: function(data){
          var img = [];
          res = data.report.data;
          for(i = 0; i < res.length; ++i)
            img[i] = "//172.16.16.57:3000/uploads/" + res[i].photo;
          var od = document.createElement('div');
          od.setAttribute('class', 'main-img-div row col-md-2');
          for(i in img)
          {
            var d = document.createElement('div');
            d.setAttribute('class','sub-img-div col-xs-3');
            d.setAttribute('style','padding:100px;');
            d.innerHTML = '<img src="' + img[i] + '"/>' +
            '<button onclick="solved()" class="dontShowWhenNotLoggedIn">Solved</button>';
            od.appendChild(d);
          }
          document.getElementById('map').style.display = "none";
          var bd = '<button onclick="images_rev()" class="btn btn-default">Back</button>'; 
          var bbd = document.createElement('div');
          bbd.setAttribute('class', 'btn1');
          bbd.setAttribute('style', 'padding: 10px;');
          bbd.innerHTML = bd;
          od.appendChild(bbd); 
          document.getElementById('complaint-images').innerHTML = od.innerHTML;
        }
      });
      

    }
    function images_rev(){
      document.getElementById('map').style.display = "block";
      document.getElementById('complaint-images').style.display = "none";
      document.getElementById('signin-signup').style.display = 'none';
    }

    function showLogin() {
      document.getElementById('complaint-images').style.display = "none";
      document.getElementById('map').style.display = "none";
      document.getElementById('signin-signup').style.display = 'block';
      document.getElementById('cmp_id').setAttribute('target', '');
      document.getElementById('cmp_id').setAttribute('href', '#');
      document.getElementById('cmp_id').setAttribute('onclick', 'show_cmp()');
    }
    function show_cmp() {
      document.getElementById('complaint-images').style.display = "none";
      document.getElementById('signin-signup').style.display = 'none';
      document.getElementById('map').style.display = "block";
      
    }

    function signin() {
      email = document.getElementById('login_email').value;
      pass = document.getElementById('login_pass').value;
      $(document).ready(function(){
          $.ajax({
          method: 'POST',
          dataType: 'json',
          url: "//172.16.16.57:3000/corpLogin",
          data: {email: email, pass: pass},
          success: function(){
            if(res.success === true) {
              var elements = document.getElementsByClassName('dontShowWhenNotLoggedIn');
              for (var i in elements) {
                if (elements.hasOwnProperty(i)) {
                  elements[i].className = 'showWhenLoggedIn';
                }
              }
           } 
          }
        });
      });
    }

    function signup() {
      name = document.getElementById('signup_name').value;
      email = document.getElementById('signup_email').value;
      phone = document.getElementById('signup_phone').value;
      pass = document.getElementById('signup_pass').value;
      /*var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
         res = JSON.parse(xhttp.responseText);
         if(res.success === true) {
            alert("Sucessfully signed-up. Signin to continue");
         }
        }
      }
      xhttp.open("POST", "//172.16.16.57:3000/corp/register", true);
      xhttp.setRequestHeader("Content-type", "application/x-form-urlencoded");
      xhttp.send("email="+email+"&password="+pass+"&name="+name+"&phone="+phone); */  
      $(document).ready(function(){
          $.ajax({
          method: 'POST',
          dataType: 'json',
          url: "//172.16.16.57:3000/corp/register",
          data: {first_name: name, last_name: "default", email: email, phone: phone, password: pass, confirm_password:pass},
          success: function(){
            console.log("success"); 
          }
        });
      });

    }

    function solved(complaint_id) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
         res = JSON.parse(xhttp.responseText);
        }
      }
      xhttp.open("GET", "ajax_info.txt", true);
      xhttp.send();
    };