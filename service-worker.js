self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open("it-asset").then(c=>
      c.addAll(["index.html","dashboard.html","admin.html"])
    )
  );
});
