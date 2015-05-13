var visual=require[('/js/visual')]

test('Should have visual file', visual,function(visual){
	expect(1);
	ok(visual, "visual file is exist");

})
test('Should not have Null value',visual,function(visual){
	expect(1);
	notEqual(null,false,"visual is not Null ")
})

var topten=require[('/js/toptenChart')]

test('Should have toptenChart file',topten,function(topten){
	expect(1);
	ok(topten, "toptenChart file is exist");
})

var bootstrap=require[('/stylesheets/bootstrap.min.css')]
test('Should have bootstrap file',bootstrap,function(bootstrap){
	expect(1);
	ok(bootstrap, "bootstrap file is exist");
});

var c=require[('/stylesheets/c3.min.css')]
test('Should have c3 css file',c, function(c){
	expect(1);
	ok(c, "c3 file is exist");
})