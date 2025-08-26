(function(){
  function byId(id){ return document.getElementById(id); }
  fetch('/data/site.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(d => {
      var m = [
        ['site_title','site_title'],
        ['hero_title','hero_title'],
        ['hero_subtitle','hero_subtitle'],
        ['contact_email','contact_email'],
        ['contact_phone','contact_phone'],
        ['about_title','about_title'],
        ['about_text','about_text']
      ];
      for (var i=0;i<m.length;i++){
        var el = byId(m[i][0]);
        if (el && d[m[i][1]] != null){
          if (el.tagName && (el.tagName.toLowerCase()==='input' || el.tagName.toLowerCase()==='textarea')){
            el.value = d[m[i][1]];
          } else {
            el.textContent = d[m[i][1]];
          }
        }
      }
    })
    .catch(console.error);
})();