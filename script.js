// =========================
// Bounds للطبقة المحددة
// =========================

var layer = doc.activeLayer;

// bounds:
// [left, top, right, bottom]
var bounds = layer.bounds;

var left = bounds[0].as("px");
var top = bounds[1].as("px");
var right = bounds[2].as("px");
var bottom = bounds[3].as("px");


// =========================
// إنشاء Guides
// =========================

// يسار الطبقة
addGuide(
  left,
  "Vrtc"
);

// يمين الطبقة
addGuide(
  right,
  "Vrtc"
);

// أعلى الطبقة
addGuide(
  top,
  "Hrzn"
);

// أسفل الطبقة
addGuide(
  bottom,
  "Hrzn"
);
