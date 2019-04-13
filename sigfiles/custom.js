var counter = 1;
var linkCnt = 1;
var linkSocial = 1;
var numSubCat = 0;
isHere = 0;
 function ensureHTTP(string) {
   var patt = new RegExp("@");
   if (!/^https?:\/\//i.test(string)) {
     if(patt.test(string)) {
       return 'mailto:' + string;
     }
     else {
       return 'https://' + string;
     }
   }
   else {
     return string;
   }
 }

 function SelectText(element) {
     var doc = document
         , text = doc.getElementById(element)
         , range, selection
     ;
     if (doc.body.createTextRange) {
         range = document.body.createTextRange();
         range.moveToElementText(text);
         range.select();
     } else if (window.getSelection) {
         selection = window.getSelection();
         range = document.createRange();
         range.selectNodeContents(text);
         selection.removeAllRanges();
         selection.addRange(range);
     }
 }
 function generateSubTitle(elm, elm2) {
   if(elm === undefined) {
       elm = "";
    }
    if(elm2 === undefined) {
       elm2 = "";
    }
       var value = '<div class="subDeptContainer">'+
       '<div onClick="destroyElm(this)" class="destroyElm">X</div>'+
       '<div class="inputContainer" style="width:45%;">'+
         '<label> Sub Title '+counter+' </label>'+
         '<input class="subValue" type="text" value="'+elm+'" />' +
       '</div>'+
       '<div class="inputContainer" style="width:45%;">'+
         '<label> Sub Department '+counter+' </label>'+
         '<input class="subValue2" type="text" value="'+elm2+'" />' +
       '</div>'+
       '<br class="clear" /></div><br />';
       $('#subDeptHolder').append(value);
       counter++;
 }

 function fillIt() {
       $('#loader').fadeToggle(500);
       var autoPop = $("#autoPop").val();
       $.post("asudata.php", {autoPop: autoPop}, function(data){
         $('#loader').fadeToggle(500);

           var obj = jQuery.parseJSON(data);
           $('#name').val(obj.firstName + ' ' + obj.lastName);
           $('#email').val(obj.email);
           $('#titleDept').val(obj.title);
           $('#Dept').val(obj.department);
           $('#Subsidiary').val(obj.subsidiary);
           $('#phone').val(obj.phone);
           $('#mainDepartment').val(obj.department);
           $('#addLine1').val("Mail Code: " + obj.mailcode);
           if(obj.city != '' && obj.state != '') {
            $('#addLine3').val(capitalize(obj.city) + ", " + obj.state + " " + obj.postcode);
           }
           updatePhone('#phone');

       });
 }
 function createSubCat(create) {
   if(create === undefined) {
       elm = false;
    }
   numSubCat++;
   var value = '<div id="subDeptMainContainer'+numSubCat+'" class="subDeptMainContainer">'+
   '<div onClick="destroyElm2(this)" class="destroyElm2">X</div>'+
   'Custom Link - Line ' + numSubCat + '<br /><br />';
   '<br class="clear" /></div>';
   $('#subLinkHolder').append(value).sortable({connectWith: '#subLinkHolder'});
   if(!create) {
    createLinks();
      $('html, body').animate({
         scrollTop: $("#subLinkHolder").offset().top
       }, 1000);
   }
 }
 function capitalize(s) {
     return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
 }
 function createLinks(theString, theLinkText, theLink) {
   if(theString === undefined) {
       theString = "";
    }
    if(theLinkText === undefined) {
        theLinkText = "";
     }
    if(theLink === undefined) {
         theLink = "";
      }
   if(numSubCat == 0) {
     createSubCat(true);
       $('html, body').animate({
         scrollTop: $("#subLinkHolder").offset().top
       }, 1000);
   }
     var field = '<div class="linkContainer">\
     <div onClick="destroyElm(this)" class="destroyElm">X</div>\
     <br class="clear" />\
     <div class="inputContainer phone">\
     <label> Custom Statement '+linkCnt+' </label>\
     <input class="subValueString" type="text" value="'+theString+'" />\
     </div>\
     <div class="inputContainer phone">\
     <label> Word(s) To Be Linked '+linkCnt+' </label>\
     <input class="subValueLinkText" type="text" value="'+theLinkText+'" />\
     </div>\
     <div class="inputContainer phone">\
     <label> URL '+linkCnt+' </label>\
     <input class="subValueLink" type="text" value="'+theLink+'" />\
     </div>\
     <br class="clear" />\
     </div>';
     $('#subDeptMainContainer'+numSubCat).append(field).sortable({connectWith: '.subDeptMainContainer'});
     linkCnt++
 }

 function destroyElm(elm) {
   var parent = $(elm).parent();
   $(parent).remove();
 }
function destroyElm2(elm) {
   var parent = $(elm).parent();
   $(parent).remove();
   numSubCat = 0;
 }
 function hideDialog() {
   $('.askDateRange').remove();
   isHere = 0;
 }
 function phoneFormatter() {
   $('#phone, #fax, #cell').on('input', function() {
     updatePhone(this);
   });
 }
 function updatePhone(elm) {
   var number =  $(elm).val().replace(/\D/g,'');
     if (number.length == 10) {
       number = number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
     }
     $(elm).val(number);
 }
 function showMask() {
   $('#mask').fadeToggle(500, function() {
     $('.thePreview').animate({
       width: '75%',
       padding: '25px'
     }, 500, function() {
       $('.hidePreview').fadeToggle(500);
     });
   });
 }
 function hidePreview() {
   $('.hidePreview').fadeToggle(500, function() {
     $('.thePreview').animate({
       width: '0%',
       padding: '0px'
     }, 500, function() {
       $('#mask').fadeToggle(500);
     });
   });
 }
 function updateAll() {
   var r = confirm("Please verify that all the information entered in correct and spelled/abbreviated correctly. Press OK to proceed.");
   if(r) {
   showMask();
   $('.tableHolder').empty();
   $('.hyperlinkHolder').empty();
   $('.bottomHolder').empty();
   $('.socialMediaHolder').empty();
   $('#address').empty();
   $('#addressPO').empty();

   $('#preName').html($("#name").val());
   $('#preTitleDept').html($("#titleDept").val());
   $('#preDept').html($("#Dept").val());

    // console.log($('#subsidiary').val());
    if ($('#subsidiary').val() == 'realty'){
      console.log('realty');
      $('#preSubsidiary').html('<strong>University Realty</strong><br />Advancing the Arizona State University Knowledge Enterprise<br />An Affiliate of the ASU Foundation for A New American University');
    } else if ($('#subsidiary').val() == 'skysong'){
      console.log('skysong');
      $('#preSubsidiary').html('<strong>Skysong Innovations</strong><br />Advancing the Arizona State University Knowledge Enterprise');
    } else if ($('#subsidiary').val() == 'asuep'){
      console.log('asuep');
      $('#preSubsidiary').html('<strong>ASU Enterprise Partners</strong>');
    } else if ($('#subsidiary').val() == 'asuf'){
      console.log('asuf');
      $('#preSubsidiary').html('<strong>ASU Foundation</strong>');
    } else if ($('#subsidiary').val() == 'asure'){
      console.log('asure');
      $('#preSubsidiary').html('<strong>ASURE</strong>');
    } else if ($('#subsidiary').val() == 'ecasu'){
      console.log('ecasu');
      $('#preSubsidiary').html('<strong>ECASU</strong>');
    }

     // $('#preSubsidiary').html('$('#subsidiary option:selected').text()');
     // $('#preSchool').html('Arizona State University');

   $('.subValue').each(function() {
   var parent = $(this).parent().parent();
   var text2 = $('.subValue2', parent).val();
   var text = $(this).val();
   var val = '<tr>' +
       '<td>'+
        '<span style="color:#000; font-size:8pt; font-weight:normal;">'+text+'</span>'+
       '</td></tr>'+
       '<tr><td>'+
        '<span style="color:#000; font-size:8pt; font-weight:normal;">'+text2+'</span>'+
       '</td>'+
    '</tr>';
     $('.tableHolder').append(val);
   });
   phoneVal = '';
   faxVal = '';
   cellVal = '';
   if($('#phone').val() != '') {
     phoneVal = '<strong>p: </strong> <a style="color:#8C1D40; font-size:8pt; font-family:arial, sans-serif;" href="tel:'+$('#phone').val()+'">'+$('#phone').val()+'</a>&nbsp;&nbsp;';
   }
   if($('#fax').val() != '') {
     faxVal = '<strong>f: </strong> <a style="color:#8C1D40; font-size:8pt; font-family:arial, sans-serif;" href="tel:'+$('#fax').val()+'">'+$('#fax').val()+'</a>&nbsp;&nbsp;';
   }
   if($('#cell').val() != '') {
     cellVal = '<strong>c: </strong> <a style="color:#8C1D40; font-size:8pt; font-family:arial, sans-serif;" href="tel:'+$('#cell').val()+'">'+$('#cell').val()+'</a>';
   }
   $('#prePhone').html(phoneVal + faxVal + cellVal);
   if($('#email').val() != '') {
     if(validateEmail($('#email').val())) {
       var emailText = $('#email').val().toLowerCase();
       $('#preEmail').html('<strong>email: </strong><a style="color:#8C1D40; font-size:8pt; font-family:arial, sans-serif;" href="mailto:'+emailText+'">'+emailText+'<a/>');
     }
     else {
       alert("That is not a valid email.  Please make sure to enter a valid email address")
     }
   }
   if($('#web').val() != '') {
       var webText = $('#web').val().toLowerCase();
       var webText2 = ensureHTTP(webText);
       $('#preWeb').html('<strong>web: </strong><a style="color:#8C1D40; font-size:8pt; font-family:arial, sans-serif;" href="'+webText2+'">'+webText+'<a/>');
   }
   if($('#addLine1').val() != '' || $('#addLine2').val() != '' || $('#addLine3').val() != '') {
   var val = '<tr height="0"><td align="left"></td></tr>';
    $('#address').append(val);
   }
   if($('#addLine1').val() != '') {
   var val = '<tr>' +
       '<td>'+
        '<span style="color:#000; font-size:8pt; font-weight:bold;">'+$('#addLine1').val()+' '+$('#addLine2').val()+' '+$('#addLine3').val()+'</span>'+
       '</td>'+
    '</tr>';
    $('#address').append(val);
   }

   if($('#addLine11').val() != '' || $('#addLine22').val() != '' || $('#addLine33').val() != '') {
   var val = '<tr height="0"><td align="left"></td></tr>';
    $('#addressPO').append(val);
   }
   if($('#addLine11').val() != '') {
   var val = '<tr>' +
       '<td>'+
        '<span style="color:#000; font-size:8pt; font-weight:bold;">'+$('#addLine11').val()+' '+$('#addLine22').val()+' '+$('#addLine33').val()+'</span>'+
       '</td>'+
    '</tr>';
    $('#addressPO').append(val);
   }

   // if($('#addLine2').val() != '') {
   // var val = '<tr>' +
   //     '<td>'+
   //      '<span style="color:#000; font-size:8pt; font-weight:normal;">'+$('#addLine2').val()+'</span>'+
   //     '</td>'+
   //  '</tr>';
   //  $('#address').append(val);
   // }
   // if($('#addLine3').val() != '') {
   // var val = '<tr>' +
   //     '<td>'+
   //      '<span style="color:#000; font-size:8pt; font-weight:normal;">'+$('#addLine3').val()+'</span>'+
   //     '</td>'+
   //  '</tr>';
   //  $('#address').append(val);
   // }

   if($('.subDeptMainContainer')[0]) {
     var val = '<tr height="10"><td align="left"></td></tr>';
     $('.hyperlinkHolder').prepend(val);
   }
 $('.subDeptMainContainer').each(function() {
   var val = '<tr><td align="left">';
   var elm = $(this);
   var cnt = 0;
   $('.linkContainer', elm).each(function() {
     if(cnt > 0) {
       val += " | ";
     }
   var text = $('.subValueString', this).val();
   var linkText = $('.subValueLinkText', this).val();
   var link = $('.subValueLink', this).val();

   var linkValue = generateLink(text, linkText, link);
       val += '<span style="color:#000; font-size:8pt; font-weight:normal;"> '+linkValue+' </span>';
       cnt++;
  });
  val += '</td></tr>';
 $('.hyperlinkHolder').append(val);
 });
 if($('.subDeptContainerSocial')[0]) {
   var val = '<tr height="10"><td align="left"></td></tr>';
   $('.socialMediaHolder').prepend(val);
 }
 var dasValue = '<tr><td>';
 $('.subDeptContainerSocial').each(function() {
 var link = $('.subValLink',this).val();
 var title = $('.socialTitle',this).val();
   dasValue = dasValue + '<span style="color:#fff; background:#8C1D40; padding:1px; font-size:8pt; font-weight:normal;"><a style="color:#fff; text-decoration:none;" href="'+ensureHTTP(link)+'">'+title+'</a></span>&nbsp;';

 });
   dasValue = dasValue + '</td></tr>';
 $('.socialMediaHolder').append(dasValue);
 $('.bottomHolder').append(otherStuff());
 }
 }
 function generateLink(text, linkText, link) {
   slitWords = text.split(linkText);
   link = ensureHTTP(link);
   if(slitWords[0] != null && slitWords[1] != null) {
     string = slitWords[0] + '<a style="color:#8C1D40; font-size:8pt; font-family:arial, sans-serif;" href="'+link+'">'+linkText+'</a> ' +  slitWords[1];
     return string;
   }
   else {
     return "";
   }
 }
 function validateEmail(email) {
   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(email);
 }
 function otherStuff() {
   var valInno = '<tr>' +
       '<td><br>'+
        '<span style="color:#000; font-size:8pt; font-weight:bold; background:#FFC627;">ASU top 1% of world&#39;s most prestigious universities</span>'+
       '</td>'+
    '</tr>'+
     '<tr>' +
       '<td>'+
        '<span style="color:#000; font-size:8pt;">—Times Higher Education</span>'+
       '</td>'+
    '</tr>'+
  '<tr>' +
'<td><br>'+
 '<span style="color:#000; font-size:8pt; font-weight:bold; background:#FFC627;">ASU #1 in the U.S. for innovation</span>'+
'</td>'+
'</tr>'+
'<tr>' +
'<td>'+
 '<span style="color:#000; font-size:8pt;">—U.S. News & World Report</span>'+
'</td>'+
'</tr>';
   var valBlank = '';

   var valCamp = '<tr>' +
       '<td><br>'+
        '<span style="color:#8C1D40; font-size:8pt; font-weight:bold; background:#FFC627;">Campaign ASU 2020</span>'+
       '</td>'+
    '</tr>'+
    '<tr>' +
       '<td>'+
        '<span style="color:#8C1D40; font-weight:bold; font-size:8pt;">Together our potential is limitless</span>'+
       '</td>'+
    '</tr>'+
     '<tr>' +
       '<td>'+
        '<span style="color:#8C1D40; font-size:8pt;"><a style="color:#8C1D40;" href="https://giveto.asu.edu">giveto.asu.edu</a></span>'+
       '</td>'+
    '</tr>';

    var which = $('.bottomSelection.active').data('which');
    if(which == 'inno') {
      return valInno;
    }
    if(which == 'camp') {
      return valCamp;
    }
    return valBlank;
 }
 function saveJSON() {
     var myJsonString = fillData();
     $('#jsonData').val(myJsonString);
     $('#userName').val($('#name').val());
 }
 function doData() {
   var name = $('#name').val();
   var dept = $('#titleDept').val();
    $.post('lib/processSaveData.php', {name:name, dept:dept}, function(data) {
      console.log(data);
    });
 }
 function fillData() {
   jsonObj = [];

   var name = $('#name').val();
   var titleDept = $('#titleDept').val();
   var dept = $('#Dept').val();
   var subsidiary = $('#Subsidiary').val();
   var phone = $('#phone').val();
   var fax = $('#fax').val();
   var cell = $('#cell').val();
   var email = $('#email').val();

   var addLine1 = $('#addLine1').val();
   var addLine2 = $('#addLine2').val();
   var addLine3 = $('#addLine3').val();

   var addLine11 = $('#addLine11').val();
   var addLine22 = $('#addLine22').val();
   var addLine33 = $('#addLine33').val();

   var thingy = [];
   $('.subDeptContainer').each(function() {
     var thisElm = $(this);
     var eachVal = $('.subValue', thisElm).val();
     var eachVal2 = $('.subValue2', thisElm).val();
     subItem = {}
     subItem["value"] = eachVal;
     subItem["value2"] = eachVal2;
     thingy.push(subItem);
   });

   var thingy2 = [];
   var linkCount = 0;
   $('.subDeptMainContainer').each(function() {
     var thisElm = $(this);
     subItem = []
       $('.linkContainer', thisElm).each(function() {
         var thisElm = $(this);
         var eachVal = $('.subValueString', thisElm).val();
         var eachVal2 = $('.subValueLinkText', thisElm).val();
         var eachVal3 = $('.subValueLink', thisElm).val();
         subItem2 = {}
         subItem2["string"] = eachVal;
         subItem2["linktext"] = eachVal2;
         subItem2["link"] = eachVal3;
         subItem.push(subItem2);
       });
     subItem["item"] = subItem2;
     thingy2.push(subItem);
     linkCount++;
   });

   var thingy3 = [];
   $('.subDeptContainerSocial').each(function() {
     var thisElm = $(this);
     var link = $('.subValLink', thisElm).val();
     var title = $('.socialTitle', thisElm).val();
     subItem = {}
     subItem["title"] = title;
     subItem["link"] = link;
     thingy3.push(subItem);
   });

   item = {}
   item["name"] = name;
   item["titleDept"] = titleDept;
   item["dept"] = dept;
   item["phone"] = phone;
   item["fax"] = fax;
   item["cell"] = cell;
   item["email"] = email;
   item["addLine1"] = addLine1;
   item["addLine2"] = addLine2;
   item["addLine3"] = addLine3;
   item["addLine11"] = addLine11;
   item["addLine22"] = addLine22;
   item["addLine33"] = addLine33;
   item["addTitles"] = thingy;
   item["linklines"] = thingy2;
   item["social"] = thingy3;
   jsonObj.push(item);
   return JSON.stringify(jsonObj);
 }

   $('form.uploadForm').ajaxForm({
      complete: function(xhr) {
      var data = xhr.responseText;
      try {
        var dasDatum = jQuery.parseJSON(data);
        dasDatum = dasDatum[0]
        $('#name').val(dasDatum.name);
        $('#titleDept').val(dasDatum.titleDept);
        $('#Dept').val(dasDatum.dept);
        $('#Subsidiary').val(dasDatum.subsidiary);
        $('#phone').val(dasDatum.phone);
        $('#fax').val(dasDatum.fax);
        $('#cell').val(dasDatum.cell);
        $('#email').val(dasDatum.email);

        $('#addLine1').val(dasDatum.addLine1);
        $('#addLine2').val(dasDatum.addLine2);
        $('#addLine3').val(dasDatum.addLine3);

        $('#addLine11').val(dasDatum.addLine11);
        $('#addLine22').val(dasDatum.addLine22);
        $('#addLine33').val(dasDatum.addLine33);

        for(let value of dasDatum.addTitles) {
          generateSubTitle(value.value, value.value2);
        }
       var cnt = 0;
        for(let value of dasDatum.linklines) {
          cnt++;
          createSubCat(cnt);

          for(let val2 of value) {
            var theVal = val2;
            createLinks(theVal.string, theVal.linktext, theVal.link);
          }
        }
        for(let value of dasDatum.social) {
          createSocialMedia(value.title, value.link);
        }
      } catch (e) {
        alert("Invald Template File")
      }
     }
   });

   function createSocialMedia(elm, elm2) {
     if(elm === undefined) {
         elm = "";
      }
      if(elm2 === undefined) {
          elm2 = "";
       }
     var options = ['facebook', 'twitter', 'instagram', 'snapchat', 'linkedin', 'youtube', 'vimeo', 'google+', 'slack', 'pinterest', 'google scholar'];
     var value = '<div class="subDeptContainerSocial">'+
     '<div onClick="destroyElm(this)" class="destroyElm">X</div><div class="inputContainer" style="width:45%;">'+
     '<label> Social Media '+linkSocial+' </label>'+
     '<select class="socialTitle">';
     for(let val of options) {
       if($.trim(val) === $.trim(elm)) {
         value += '<option selected value="'+$.trim(val)+'">'+$.trim(val)+'</option>'
       }
       else {
         value += '<option value="'+$.trim(val)+'">'+$.trim(val)+'</option>'
       }
     }
     value += '</select>' +
     '</div><div class="inputContainer" style="width:45%;">'+
     '<label> Social Media Link '+linkSocial+' </label>'+
     '<input type="text" class="subValLink" value="'+elm2+'" />'+
     '</div> <br class="clear"/></div>';
     $('#socialMediaHolder').append(value);
     linkSocial++;
   }
