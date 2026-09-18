const marginInput = document.getElementById("margin");
const addButton = document.getElementById("addGuides");
const status = document.getElementById("status");


// إرسال Script إلى Photopea
function runPhotopea(script) {
  window.parent.postMessage(script, "*");
}


addButton.addEventListener("click", () => {

  const marginCM = Number(marginInput.value);

  if (!Number.isFinite(marginCM) || marginCM <= 0) {
    status.textContent = "أدخل قيمة صحيحة";
    return;
  }


  const script = `

    (function () {

      if (!app.documents.length) {

        app.echoToOE("NO_DOCUMENT");

        return;
      }


      var doc = app.activeDocument;


      // تحويل السنتيمتر إلى Pixels
      // حسب Resolution المستند

      var margin =
        (${marginCM} / 2.54) *
        doc.resolution;


      // =========================
      // إنشاء Guide
      // =========================

      function addGuide(position, orientation) {

        var idMk =
          charIDToTypeID("Mk  ");

        var desc =
          new ActionDescriptor();


        var idNw =
          charIDToTypeID("Nw  ");

        var guideDesc =
          new ActionDescriptor();


        var idPstn =
          charIDToTypeID("Pstn");

        var idPxl =
          charIDToTypeID("#Pxl");


        guideDesc.putUnitDouble(
          idPstn,
          idPxl,
          position
        );


        var idOrnt =
          charIDToTypeID("Ornt");


        guideDesc.putEnumerated(
          idOrnt,
          idOrnt,
          charIDToTypeID(orientation)
        );


        var idGd =
          charIDToTypeID("Gd  ");


        desc.putObject(
          idNw,
          idGd,
          guideDesc
        );


        executeAction(
          idMk,
          desc,
          DialogModes.NO
        );
      }


      // =========================
      // Guides
      // =========================

      // يسار
      addGuide(
        margin,
        "Vrtc"
      );


      // يمين
      addGuide(
        doc.width - margin,
        "Vrtc"
      );


      // أعلى
      addGuide(
        margin,
        "Hrzn"
      );


      // أسفل
      addGuide(
        doc.height - margin,
        "Hrzn"
      );


      app.echoToOE(
        "MARGINS_DONE"
      );

    })();

  `;


  status.textContent =
    "جاري إضافة Guides...";


  runPhotopea(script);
});


// استقبال رسالة من Photopea

window.addEventListener(
  "message",
  function (event) {

    if (event.data === "MARGINS_DONE") {

      status.textContent =
        "تمت إضافة 4 Guides ✓";

    }


    if (event.data === "NO_DOCUMENT") {

      status.textContent =
        "افتح مستندًا أولاً";

    }

  }
);