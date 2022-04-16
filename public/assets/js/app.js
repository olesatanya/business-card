var cardType=1;

const cardnames = [
  "Assurance", "CNOPS", "Cnss", "Permi", "Press", "Vignette", "Visite tech"
]

$(document).ready(function(){
    $(".card-button").click(function(){
      var type=$(this).data('type');
      cardType=type;
      $(".card-button").removeClass("active");
      $(this).addClass("active");
      showCard(cardType);
    });
    $("#card1").show();
    $(".theme-menu").click(function(){
      var imgid=$(this).find("img")[0].src;
      for(var i=1; i<8; i++){
        $("#card"+i).css('background-image', 'url('+imgid+')')
        $("#card"+i).css('background-size', 'cover')
      }
      $(".theme-menu").removeClass('active')
      $(this).addClass("active");
    });
    $(".photo").click(function(){
      $(this).next().click();
    })
    $(".closeBtn, .overlay").click(function(){
      $(".previewModal").hide();
    })
});

function changePhoto(input){
  var url = input.value;
  var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
  if (input.files && input.files[0]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $(input).prev().attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
  }
}

function showCard(type){
  $(".card-content").hide();
  $("#card"+type).show();
}

function previewPDF(){
  var node = document.getElementById('card'+cardType);
  html2canvas(node,
  {
    allowTaint: false,
    useCORS: false
  }).then(function (canvas) {
    $("#previewImg").empty();
    canvas.id="previewCanvas";
    var canvas2= canvas;
    canvas2.style.width=300;
    canvas2.style.height=300;
    // document.getElementById("previewImg").appendChild(canvas);
    document.getElementById("previewImg").appendChild(canvas2);
    $(".previewModal").show();
  });
}

function downloadPDF1(){
  const doc = jspdf.jsPDF({
    unit: "mm"
  });
  var width = previewCanvas.width * 1.3 /10;
  var height = previewCanvas.height * 1.3 /10;
  doc.addImage(document.getElementById("previewCanvas"), 30, 10, width, height );
  doc.save(cardnames[cardType-1]+'.pdf');
}
function downloadPDF2(){
  const doc = jspdf.jsPDF({
    unit: "mm"
  });
  var width = previewCanvas.width * 1.3 /10;
  var height = previewCanvas.height * 1.3 /10;
  doc.addImage(document.getElementById("previewCanvas"), 30, 10, width, height );
  doc.addImage(document.getElementById("previewCanvas"), 30, 10+height+10, width, height );
  doc.save(cardnames[cardType-1]+'.pdf');
}


function downloadPNG(){
  const link = document.createElement('a');
  link.download = cardnames[cardType-1]+'.png';
  link.href = previewCanvas.toDataURL();
  link.click();
  link.delete;
}