  $(document).ready(function(){

    // Previne que dropdown feche ao click, nos e que controlamos isso
    $('.dropdown-menu li > a').click(function(e){
      e.stopPropagation();
    });

    // Fecha todos os menus ao clicar num qq botao do menu principal
    $('.dropdown-toggle').click(function () {
    	// Fecha todos os submenus abertos
     	$('.dropdown-submenu .open-submenu').hide();
    });
         
    // Ao carregar num qq item
  	$(".dropdown-menu li > a").click(function (){
  	
  		// Alterna o fundo on click
  		$(".menuitem-selected").removeClass('menuitem-selected');	
  		$(this).addClass("menuitem-selected");
  	
  		// Fecha todos os submenus abertos
  		$('.dropdown-submenu .open-submenu').hide();
  	      
  	    // Abre submenu se existir
  		var submenu = $(this).closest('.dropdown-submenu').find('.dropdown-menu');
  		if (submenu != ""){
  			submenu.show();
  			submenu.addClass("open-submenu"); 
  			
  			// Fecha menus ao clicar num item do sub-menu
        submenu.find('a').click(function () { 
          $(this).addClass("menuitem-selected");  
          setTimeout(function(){
            submenu.hide();
            $(".open").removeClass('open');
            $(".menuitem-selected").removeClass('menuitem-selected');
          }, 200);  
        });
  		}
    		 
  		// Fecha menu inicial se tiver carregado num item do menu inicial
      if ($(this).next().html()) {
        // Nothing
      } else {
          setTimeout(function(){
          $(".open").removeClass('open');
          $(".menuitem-selected").removeClass('menuitem-selected');
          }, 200);
      }
    });

    $('.nav > li').mousedown(function() {
      $(this).css('background-color', '#eeeeee');
      setTimeout(function(){
      }, 500);
    }).
    mouseup(function(){
      $(this).css('background-color', 'transparent');
    });

  });

  var selectedImage;
  var actualMenu = "photos";
  var photosPages = 2;
  var imagesPhotosNumber =5;
  var imagesPhotos2ndNumber = 3;
  var imagesAlbunsNumber = 5;
  var imagesAnimationsNumber = 1;
  var imagesPostcardNumber = 1;
  var imagesAlbumSpainNumber = 3;
  var imagesAlbumPortugalNumber = 1;
  var imagesAlbumFranceNumber = 3;
  var imagesAlbumGermanyNumber = 3;
  var imagesSharesNumber = 1;
  var currentButton;
  var friendforShare;
  var contentSelected = null;

	var operation = null;
	var modalAlbum = null;
	var modalSelectedImage = null;
	var currentModal = null;
	
  var infoActive = false;
	var levelOfModal = 1;
	var modal1stLevel ='#my-albumPhotoList-modal > div#first-level-albumPhotoList-list > ul#navigation';
	var modal2ndLevel ='#my-albumPhotoList-modal > div#second-level-albumPhotoList-list > ul#navigation';
  
  function resetState(){
    localStorage.clear();
  }

  function clearBorders(){
    for(i=0; i < 4; i++){
      var images = $('.image-box > div').eq(i);
      if(images.hasClass('image-selected'))
        images.removeClass('image-selected');
    }
    disableButtonStatus();
  }

  function clearCaretButtons(){
    $('.i1st-image-caret-button').hide();
    $('.i2nd-image-caret-button').hide();
    $('.i3rd-image-caret-button').hide();
    $('.i4th-image-caret-button').hide();
  }

  function showSidebar(source){

    loadDescriptionForm(source);
    if(!$('#main').hasClass('use-sidebar')){
      $('#main').addClass('use-sidebar');
    }

    var query = '.image-box > .' + source + ' > p';
    var text = $(query).first().text();
    $('.sidebar-title').text(text);
    text = $(query + '.date').text();
    $('.sidebar-date').text(text);
  }

  function hideSidebar(){
    if($('#main').hasClass('use-sidebar') ){
      $('#main').removeClass('use-sidebar');
      resizeReset();
    }

  }

  function processSingleClick(source){
    clearBorders();
    clearCaretButtons();
    $('.' + source).addClass('image-selected');
    $('.' + source + '-caret-button').show();
    selectedImage = source;
    enableButtonStatus();
    loadDescriptionForm(source);

    if(infoActive){
      resize();
      showSidebar(source);
    }
    else {
      resizeReset();
    }
  }

  function processDblClick(source){
    selectedImage = null;
    clearBorders();
    changeMenu(actualMenu, source);
  }

  function checkButtons(){
    disableButtonStatus();

    switch(actualMenu){
      case 'photos':
      case 'photos2nd':
      case 'albuns':
      case 'animations':
      case 'postcards':
      case 'spainAlbum':
      case 'germanyAlbum':
      case 'franceAlbum':
      case 'portugalAlbum': {
        changeButtonStatus('organize-button',true);
        break;
      }
    }
  }

  function enableButtonStatus(){

    switch(actualMenu){
      case 'photos':
      case 'photos2nd':
      case 'animations':
      case 'postcards': {
        changeButtonStatus('edit-button',true);
        changeButtonStatus('share-button', true);
        changeButtonStatus('organize-button', true);
        changeButtonStatus('info-button', true);
        break;
      }
      case 'albuns' : {
        changeButtonStatus('share-button', true);        
        changeButtonStatus('info-button', true);
        break;
      }
      case 'spainAlbum' :
      case 'germanyAlbum' :
      case 'franceAlbum' :
      case 'portugalAlbum' : {
        changeButtonStatus('edit-button', true);
        changeButtonStatus('share-button', true);
        changeButtonStatus('info-button', true);
        break;
      }
    }
  }

  function disableButtonStatus(){
    switch(actualMenu){
      case 'photos':
      case 'photos2nd':
      case 'animations':
      case 'postcards': {
        changeButtonStatus('edit-button',false);
        changeButtonStatus('share-button', false);
        changeButtonStatus('organize-button', false);
        changeButtonStatus('info-button', false);
        break;
      }
      case 'albuns' : {
        changeButtonStatus('share-button', false);
        changeButtonStatus('info-button', false);
        break;
      }
      case 'spainAlbum' :
      case 'germanyAlbum' : 
      case 'franceAlbum' :
      case 'portugalAlbum' : {
        changeButtonStatus('edit-button', false);
        changeButtonStatus('share-button', false);
        changeButtonStatus('info-button', false)
        break;
      }
    }
  }

  function changeButtonStatus(buttonName, enable){
    var button = $('.' + buttonName + '> button');

    if(enable){
      if(button.hasClass('disabled'))
    	  button.removeClass('disabled');
    }
    else
      if(!button.hasClass('disabled'))
        button.addClass('disabled'); 

  }

  function menu(menu){
    changeMenu(actualMenu, menu);
  }

  function createBreadcrumb(menu, inner){

    var a;
  	var li = "<li></li>";
    var span ="<span class=\"divider\">/</span>";

  	$('.breadcrumb').html(li);

  	if(inner){
  		a = "<a onClick=\"menu(\'albuns\')\" href=\"#\">Álbuns</a>";	
    	$('.breadcrumb > li').append(a);
    	$('.breadcrumb > li').append(span);
    	$('.breadcrumb').append(li);
    }

    a = "<a onClick=\"menu(\'"+ menu +"\')\" href=\"#\">" + getRealNameMenu(menu) + "</a>";
    $('.breadcrumb > li:last-child').append(a);
    $('.breadcrumb > li:last-child').append(span);

    localStorage.setItem(menu + 'bc', $('.breadcrumb').html());
  }


  function createPhotosMenu(){

    var to = 'photos';
    var div = "<div class=\"i1st-image\"></div>";
    var img = "<img name=\"Lyon\" src=\"images\/lyon.jpg\" onClick=\"processSingleClick(\'i1st-image\')\">"
    var par = "<p class=\"title\">Lyon</p>"
    $('.image-box').html(div);
    $('.image-box > div.i1st-image').append(img);
    $('.image-box > div.i1st-image').append(par);
    par = "<p class=\"date hide\">1/11/2012</p>";
    $('.image-box > div.i1st-image').append(par);
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i1st-image').append(par); 
    
    div = "<div class=\"i2nd-image\"></div>";
    img = "<img name=\"Dusseldorf\" src=\"images\/dusseldorf.jpg\" onClick=\"processSingleClick(\'i2nd-image\')\">"
    par = "<p class=\"title\"> Dusseldorf </p>";
    $('.image-box').append(div);
    $('.image-box > div.i2nd-image').append(img);
    $('.image-box > div.i2nd-image').append(par);
    par = "<p class=\"date hide\">2/11/2012</p>";
    $('.image-box > div.i2nd-image').append(par);
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i2nd-image').append(par);  
    

    div = "<div class=\"i3rd-image\"></div>";
    img = "<img name=\"Madrid\" src=\"images\/madrid.jpg\" onClick=\"processSingleClick(\'i3rd-image\')\">"
    par = "<p class=\"title\"> Madrid </p>";
    $('.image-box').append(div);
    $('.image-box > div.i3rd-image').append(img);
    $('.image-box > div.i3rd-image').append(par);
    par = "<p class=\"date hide\">3/11/2012</p>";
    $('.image-box > div.i3rd-image').append(par);
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i3rd-image').append(par); 
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i3rd-image').append(par);  

    div = "<div class=\"i4th-image\"></div>";
    img = "<img name=\"Indignados\" src=\"images\/indignados.jpg\" onClick=\"processSingleClick(\'i4th-image\')\">"
    par = "<p class=\"title\"> Indignados </p>";

    $('.image-box').append(div);
    $('.image-box > div.i4th-image').append(img);
    $('.image-box > div.i4th-image').append(par);
    par = "<p class=\"date hide\">3/11/2012</p>";
    $('.image-box > div.i4th-image').append(par);
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i4th-image').append(par);

    pressButton(to);
    actualMenu = to;

    createBreadcrumb(to, false);

    localStorage.setItem(to, $('.image-box').html());

    //Pagination
    var a = "<a href=\"#\" class=\"page-1st page-link current\" onClick=\"processChangePageReq(\'page-1st\')\">1</a>";
    $('.pagination-holder > div#my-pagination').html(a);
    a = "<a href=\"#\" class=\"page-2nd page-link\" onClick=\"processChangePageReq(\'page-2nd\')\">2</a>";   
    $('.pagination-holder > div#my-pagination').append(a);
    localStorage.setItem(to + 'pagination', $('.pagination-holder > div#my-pagination').html());
  }

  function createPhotos2ndMenu(){

    var to = 'photos2nd';
    var div = "<div class=\"i1st-image\"></div>";
    var img = "<img name=\"Munique\" src=\"images\/munique.jpg\" onClick=\"processSingleClick(\'i1st-image\')\">"
    var par = "<p class=\"title\">Munique</p>"
    $('.image-box').html(div);
    $('.image-box > div.i1st-image').append(img);
    $('.image-box > div.i1st-image').append(par);
    par = "<p class=\"date hide\">1/11/2012</p>";
    $('.image-box > div.i1st-image').append(par);
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i1st-image').append(par); 
    
    div = "<div class=\"i2nd-image\"></div>";
    img = "<img name=\"Marselha\" src=\"images\/marselha.jpg\" onClick=\"processSingleClick(\'i2nd-image\')\">"
    par = "<p class=\"title\"> Marselha </p>";
    $('.image-box').append(div);
    $('.image-box > div.i2nd-image').append(img);
    $('.image-box > div.i2nd-image').append(par);
    par = "<p class=\"date hide\">2/11/2012</p>";
    $('.image-box > div.i2nd-image').append(par); 
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i2nd-image').append(par); 
    
    div = "<div class=\"i3rd-image\"></div>";
    $('.image-box').append(div);

    div = "<div class=\"i4th-image\"></div>";
    $('.image-box').append(div);

    pressButton(to);
    actualMenu = to;

    createBreadcrumb(to, false);

    localStorage.setItem(to, $('.image-box').html());   

    //Pagination
    var a = "<a href=\"#\" class=\"page-1st page-link\" onClick=\"processChangePageReq(\'page-1st\')\">1</a>";
    $('.pagination-holder > div#my-pagination').html(a);
    a = "<a href=\"#\" class=\"page-2nd page-link current\" onClick=\"processChangePageReq(\'page-2nd\')\">2</a>";   
    $('.pagination-holder > div#my-pagination').append(a);
    localStorage.setItem(to + 'pagination', $('.pagination-holder > div#my-pagination').html());
  }

  function createAlbunsMenu(){

    var to = 'albuns';
    var div = "<div class=\"i1st-image\"></div>";
    var img = "<img name=\"Portugal\" src=\"images\/flagPortugal.jpg\" onClick=\"processSingleClick(\'i1st-image\')\" onDblClick=\"processDblClick(\'portugalAlbum\')\">";
    var par = "<p class=\"title\">Portugal</p>";
    $('.image-box').html(div);
    $('.image-box > div.i1st-image').append(img);
    $('.image-box > div.i1st-image').append(par);
    par = "<p class=\"date hide\">4/11/2012</p>";
    $('.image-box > div.i1st-image').append(par);
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i1st-image').append(par); 

    div = "<div class=\"i2nd-image\"></div>";
    img = "<img name=\"Spain\" src=\"images\/flagSpain.jpg\" onClick=\"processSingleClick(\'i2nd-image\')\" onDblClick=\"processDblClick(\'spainAlbum\')\">";
    par = "<p class=\"title\"> Espanha </p>";
    $('.image-box').append(div);
    $('.image-box > div.i2nd-image').append(img);
    $('.image-box > div.i2nd-image').append(par);
    par = "<p class=\"date hide\">5/11/2012</p>";
    $('.image-box > div.i2nd-image').append(par);
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i2nd-image').append(par); 

    div = "<div class=\"i3rd-image\"></div>";
    img = "<img name=\"Germany\" src=\"images\/flagGermany.jpg\" onClick=\"processSingleClick(\'i3rd-image\')\" onDblClick=\"processDblClick(\'germanyAlbum\')\">";
    par = "<p class=\"title\"> Alemanha </p>";
    $('.image-box').append(div);
    $('.image-box > div.i3rd-image').append(img);
    $('.image-box > div.i3rd-image').append(par);
    par = "<p class=\"date hide\">6/11/2012</p>";
    $('.image-box > div.i3rd-image').append(par);
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i3rd-image').append(par); 

    div = "<div class=\"i4th-image\"></div>";
    img = "<img name=\"France\" src=\"images\/flagFrance.jpg\" onClick=\"processSingleClick(\'i4th-image\')\" onDblClick=\"processDblClick(\'franceAlbum\')\">";
    par = "<p class=\"title\"> França</p>";
    $('.image-box').append(div);
    $('.image-box > div.i4th-image').append(img);
    $('.image-box > div.i4th-image').append(par);
    par = "<p class=\"date hide\">7/11/2012</p>";
    $('.image-box > div.i4th-image').append(par);
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i4th-image').append(par); 

		createBreadcrumb(to, false);

    localStorage.setItem(to, $('.image-box').html());   

    //Pagination
    var a = "<a href=\"#\" class=\"page-1st page-link current\">1</a>";
    $('.pagination-holder > div#my-pagination').html(a);
    localStorage.setItem(to + 'pagination', $('.pagination-holder > div#my-pagination').html());
  }

  function createEmptyMenu(menu){

    var div = "<div class=\"i1st-image\"></div>";
    $('.image-box').html(div);

    div = "<div class=\"i2nd-image\"></div>";
    $('.image-box').append(div);

    div = "<div class=\"i3rd-image\"></div>";
    $('.image-box').append(div);

    div = "<div class=\"i4th-image\"></div>";
    $('.image-box').append(div);

    createBreadcrumb(menu,false);

    localStorage.setItem(menu, $('.image-box').html()); 

    //Pagination
    var a = "<a href=\"#\" class=\"page-1st page-link current\">1</a>";
    $('.pagination-holder > div#my-pagination').html(a);
    localStorage.setItem(menu + 'pagination', $('.pagination-holder > div#my-pagination').html());  
  }

  function createSpainAlbum(){

    var to = 'spainAlbum';
    var div = "<div class=\"i1st-image\"></div>";
    var img = "<img name=\"Madrid\" src=\"images\/madrid.jpg\" onClick=\"processSingleClick(\'i1st-image\')\">"
    var par = "<p class=\"title\">Madrid</p>"
    $('.image-box').html(div);
    $('.image-box > div.i1st-image').append(img);
    $('.image-box > div.i1st-image').append(par);
    par = "<p class=\"date hide\">8/11/2012</p>";
    $('.image-box > div.i1st-image').append(par);
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i1st-image').append(par); 

    div = "<div class=\"i2nd-image\"></div>";
    img = "<img name=\"Indignados\" src=\"images\/indignados.jpg\" onClick=\"processSingleClick(\'i2nd-image\')\">";
    par = "<p class=\"title\"> Indignados </p>";
    $('.image-box').append(div);
    $('.image-box > div.i2nd-image').append(img);
    $('.image-box > div.i2nd-image').append(par);
    par = "<p class=\"date hide\">9/11/2012</p>";
    $('.image-box > div.i2nd-image').append(par);
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i2nd-image').append(par); 

    div = "<div class=\"i3rd-image\"></div>";
    $('.image-box').append(div);

    div = "<div class=\"i4th-image\"></div>";
    $('.image-box').append(div);

    createBreadcrumb(to, true);

    localStorage.setItem(to, $('.image-box').html());   

    //Pagination
    var a = "<a href=\"#\" class=\"page-1st page-link current\">1</a>";
    $('.pagination-holder > div#my-pagination').html(a);
    localStorage.setItem(to + 'pagination', $('.pagination-holder > div#my-pagination').html()); 
  }

  function createFranceAlbum(){

    var to = 'franceAlbum';
    var div = "<div class=\"i1st-image\"></div>";
    var img = "<img name=\"Marselha\" src=\"images\/marselha.jpg\" onClick=\"processSingleClick(\'i1st-image\')\">"
    var par = "<p class=\"title\">Marselha</p>"
    $('.image-box').html(div);
    $('.image-box > div.i1st-image').append(img);
    $('.image-box > div.i1st-image').append(par);
    par = "<p class=\"date hide\">10/11/2012</p>";
    $('.image-box > div.i1st-image').append(par);
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i1st-image').append(par); 

    div = "<div class=\"i2nd-image\"></div>";
    img = "<img name=\"Lyon\" src=\"images\/lyon.jpg\" onClick=\"processSingleClick(\'i2nd-image\')\">";
    par = "<p class=\"title\"> Lyon </p>";
    $('.image-box').append(div);
    $('.image-box > div.i2nd-image').append(img);
    $('.image-box > div.i2nd-image').append(par);
    par = "<p class=\"date hide\">11/11/2012</p>";
    $('.image-box > div.i2nd-image').append(par);
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i2nd-image').append(par); 

    div = "<div class=\"i3rd-image\"></div>";
    $('.image-box').append(div);

    div = "<div class=\"i4th-image\"></div>";
    $('.image-box').append(div);

    createBreadcrumb(to, true);

    localStorage.setItem(to, $('.image-box').html());   

    //Pagination
    var a = "<a href=\"#\" class=\"page-1st page-link current\">1</a>";
    $('.pagination-holder > div#my-pagination').html(a);
    localStorage.setItem(to + 'pagination', $('.pagination-holder > div#my-pagination').html());
  }

  function createGermanyAlbum(){
    var to = 'germanyAlbum';
    var div = "<div class=\"i1st-image\"></div>";
    var img = "<img name=\"Munique\" src=\"images\/munique.jpg\" onClick=\"processSingleClick(\'i1st-image\')\")\">";
    var par = "<p class=\"title\">Munique</p>";
    $('.image-box').html(div);
    $('.image-box > div.i1st-image').append(img);
    $('.image-box > div.i1st-image').append(par);
    par = "<p class=\"date hide\">12/11/2012</p>";
    $('.image-box > div.i1st-image').append(par);
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i1st-image').append(par);     

    div = "<div class=\"i2nd-image\"></div>";
    img = "<img name=\"Dusseldorf\" src=\"images\/dusseldorf.jpg\" onClick=\"processSingleClick(\'i2nd-image\')\">";
    par = "<p class=\"title\"> Dusseldorf </p>";
    $('.image-box').append(div);
    $('.image-box > div.i2nd-image').append(img);
    $('.image-box > div.i2nd-image').append(par);
    par = "<p class=\"date hide\">13/11/2012</p>";
    $('.image-box > div.i2nd-image').append(par);
    par = "<p class=\"description hide\"></p>";
    $('.image-box > div.i2nd-image').append(par);     

    div = "<div class=\"i3rd-image\"></div>";
    $('.image-box').append(div);

    div = "<div class=\"i4th-image\"></div>";
    $('.image-box').append(div);

    createBreadcrumb(to, true);

    localStorage.setItem(to, $('.image-box').html());   

    //Pagination
    var a = "<a href=\"#\" class=\"page-1st page-link current\">1</a>";
    $('.pagination-holder > div#my-pagination').html(a);
    localStorage.setItem(to + 'pagination', $('.pagination-holder > div#my-pagination').html());
  }


  function createPortugalAlbum(){

    var to = "portugalAlbum";
    var div = "<div class=\"i1st-image\"></div>";
    $('.image-box').html(div);

    div = "<div class=\"i2nd-image\"></div>";
    $('.image-box').append(div);

    div = "<div class=\"i3rd-image\"></div>";
    $('.image-box').append(div);

    div = "<div class=\"i4th-image\"></div>";
    $('.image-box').append(div);

    createBreadcrumb(to,true);

    localStorage.setItem(to, $('.image-box').html());   

    //Pagination
    var a = "<a href=\"#\" class=\"page-1st page-link current\">1</a>";
    $('.pagination-holder > div#my-pagination').html(a);
    localStorage.setItem(to + 'pagination', $('.pagination-holder > div#my-pagination').html());
  }

 function createAllMenus(){
    createAlbunsMenu();
    createEmptyMenu('animations');
    createEmptyMenu('postcards');
    createEmptyMenu('shares');
    createEmptyMenu('friends');
    createSpainAlbum();
    createFranceAlbum();
    createGermanyAlbum();
    createPortugalAlbum();
    createPhotos2ndMenu();
    createPhotosMenu();
  }

  function changeMenu(from, to){

    $(".menuitem-selected").removeClass('menuitem-selected');

		changeButtonColor(to+'B');
  
    selectedImage = null;
    clearBorders();
    clearCaretButtons();
    hideSidebar();
    changeInfoStatus();
	
    localStorage.setItem(from, $('.image-box').html());

    var menu = localStorage.getItem(to);
    $('.image-box').html(menu);

    var pag = localStorage.getItem(to +  'pagination');
    $('#my-pagination').html(pag);

    pressButton(to);
    actualMenu = to;
    checkButtons();
    changeBreadcrumb(to);
    
  }

  function changeBreadcrumb(to){
    $('.breadcrumb').html(localStorage.getItem(to + 'bc'));
  }
  
  function getRealNameMenu(menu){
     switch(menu){
      case 'photos' :
      case 'photos2nd':{
        return 'Fotografias';
        break;
      }
      case 'albuns' :{
        return 'Álbuns';
        break;          
      }
      case 'animations' : {
        return 'Animações';
        break;
      }
      case 'postcards' : {
        return 'Postais';
        break;
      }
	    case 'friends' : {
        return 'Amigos';
        break;
      }
      case 'Spain':
      case 'spainAlbum' : {
        return 'Espanha';
        break;
      }
      case 'France':
      case 'franceAlbum' : {
        return 'França';
        break;
      }
      case 'portugalAlbum' : {
        return 'Portugal';
        break;
      }
      case 'Germany':
      case 'germanyAlbum' : {
        return 'Alemanha';
        break;
      }
      case 'shares' : {
        return 'Partilhas';
        break;
      }
      case 'Lightning' : {
        return 'Relampagos';
        break;
      }
      case 'Snow' : {
        return 'Neve';
        break;
      }
      case 'Rain' : {
        return 'Chuva';
        break;
      }
      case 'B&W' : {
        return 'Preto e Branco';
        break;
      }
      case 'Comics' : {
        return 'Banda Desenhada';
        break;
      }
      default: 
        return menu;
        break;
    }
  }

  function pressButton(menu){
    $('.' + menu + '-button').button('toggle');
  }

  function processAnimation(name){
    setOperation(name);
	 
    if(!(selectedImage==null))  {
      var selectedName = $('.image-box > div.' + selectedImage +' > img').attr('name');
      $('#my-alert-animations > h4').text("Deseja confirmar a criação da animação " + getRealNameMenu(name) + " a partir da fotografia " + selectedName+"?");
      $('#my-alert-animations').show();
    }

    else {
			//mudar o titulo do modal
			$('#my-albumPhotoList-modal > div#title > h4').remove();
			$('#my-albumPhotoList-modal > div#title').append('<h4 id=\"my-modalLabel\">Selecione a fotografia que pretende animar:</h4>');
      showModal('#my-albumPhotoList-modal');
    }
  }

  function executeAnimation(){
    if(selectedImage == null)
      img = modalSelectedImage;
    else
      img = selectedImage;
      
    var image = $('.' + img + '> img');
    var imageName = image.attr('name') + operation;
    var imagePath = 'images/' + imageName + '.gif';

    changeMenu(actualMenu, 'animations');
    var imgTag = 'i'+getOrdinal(imagesAnimationsNumber) + '-image';
    imagesAnimationsNumber++;

    var imageSrc = "<img name=\""+imageName+"\"src=\""+imagePath+"\"onClick=\"processSingleClick(\'"+ imgTag +"\')\">";
    var imagePar = "<p class=\"title\">" + imageName + "</p>";

    $('.image-box > div.' + imgTag).append(imageSrc);
    $('.image-box > div.' + imgTag).append(imagePar);
    $('#my-success-alert-animations').show();
  }

  function processEdition(name){
		setOperation(name);
		var selectedName = $('.image-box > div.' + selectedImage +' > img').attr('name');
		//alterado
		if(name == 'Remove'){
			$('#my-alert-edition > h4').text("Deseja confirmar a reposição da fotografia " + selectedName + " na original?");
			$('#my-alert-edition').show();
		
		}else{
			$('#my-alert-edition > h4').text("Deseja confirmar a aplicação do efeito " + getRealNameMenu(name) + " à fotografia " + selectedName + "?");
			$('#my-alert-edition').show();
		}
  }
 
  function executeEdition(){
	
    var image = $('.' + selectedImage + '> img');
    var origImageName = image.attr('name');
		
		//alterado
		if(operation == 'Remove'){
			var imageName = origImageName;
		}else{
			var imageName = origImageName + operation; //operation vem do HTML
		}
		    
		var imagePath = 'images/' + imageName + '.jpg';
		
    var imageSrc = "<img name=\""+origImageName+"\"src=\""+imagePath+"\"onClick=\"processSingleClick(\'"+ selectedImage +"\')\">";
    var imagePar = "<p class=\"title\">" + origImageName + "</p>";

    $('.image-box > div.' + selectedImage).html(imageSrc);
    $('.image-box > div.' + selectedImage).append(imagePar);

    $('#my-success-alert-edition').show();

  }

  function processShareReq(){

    if(!$('.share-button > button').hasClass('disabled')){

      if(!(selectedImage==null))
        showModal('#my-friends-modal');
    }
  }

  function executeShareReq(){
    var image = $('.' + selectedImage + '> img');
    var imageName = image.attr('name');
    var imagePath = 'images/' + imageName + '.jpg';
    imageName = imageName + ' - ' + friendforShare;

    changeMenu(actualMenu, 'shares');

    var imgTag = 'i'+getOrdinal(imagesSharesNumber) + '-image';

    imagesSharesNumber++;

    var imageSrc = "<img name=\""+imageName+"\"src=\""+imagePath+"\"onClick=\"processSingleClick(\'"+ imgTag +"\')\">";
    var imagePar = "<p class=\"title\">" + imageName + "</p>";

    $('.image-box > div.' + imgTag).append(imageSrc);
    $('.image-box > div.' + imgTag).append(imagePar);
  }

  function processPostcardReq(){
		setOperation('postcards');
		
    if(!(selectedImage==null)){
      var name = $('.image-box > div.' + selectedImage +' > img').attr('name');
      $('#my-alert-postcard > h4').text("Deseja confirmar a criação do postal a partir da fotografia " + name + "?");
      $('#my-alert-postcard').show();
    }
    else{
			//mudar o titulo do modal
			$('#my-albumPhotoList-modal > div#title > h4').remove();
			$('#my-albumPhotoList-modal > div#title').append(' <h4 id=\"my-modalLabel\">Selecione a fotografia a partir da qual pretende criar um postal:</h4>');

      showModal('#my-albumPhotoList-modal');
			}
  }

  function executePostcardReq(){
    var img;
    
    if(selectedImage == null)
      img = modalSelectedImage;
    else
      img = selectedImage;

    var image = $('.' + img + '> img');
    var imageName = image.attr('name');
    imageName = "Postal" + imageName;
    var imagePath = 'images/' + imageName + '.jpg';
    changeMenu(actualMenu, 'postcards');

    var imgTag = 'i'+getOrdinal(imagesPostcardNumber) + '-image';
    imagesPostcardNumber++;

    var imageSrc = "<img name=\""+imageName+"\"src=\""+imagePath+"\"onClick=\"processSingleClick(\'"+ imgTag +"\')\">";
    var imagePar = "<p class=\"title\">" + imageName + "</p>";

    $('.image-box > div.' + imgTag).append(imageSrc);
    $('.image-box > div.' + imgTag).append(imagePar);
    $('#my-success-alert-postcard').show();

  }

  function processAddPhotoToAlbumReq(){
    //pedrada
    $('#torre-second-modal').removeAttr("style");
    $('#torre-first-modal').attr("style",'display : none');

    switch(actualMenu){
      case 'portugalAlbum':
      case 'spainAlbum':
      case 'germanyAlbum':
      case 'franceAlbum': {
        showModal('#my-photolist-modal');
        break;
      }
      case 'albuns': {
        if(!(selectedImage == null))
          showModal('#my-photolist-modal');
        else
          $('#my-warning-alert-albumlist').show();
        break;
      }
      default: {
        if(!(selectedImage == null))
          showModal('#my-albumlist-modal');
        else
          $('#my-warning-alert-albumlist').show();
        break;
      }
    }
  }

  function executeAddPhotoToAlbumReq(photoSelected){
    
    if(!photoSelected){
      //album selected
      var albumName = actualMenu;
      if(!(selectedImage == null) && (actualMenu == 'albuns')){
        albumName = $('.image-box > div.' + selectedImage + ' > img').attr('name');
        albumName = albumName.toLowerCase() + 'Album';
        changeMenu(actualMenu, albumName);
      }

      var picName = contentSelected;
      var imageNr = getImagesNumber(albumName);

      if(imageNr == 5){
        betaVersionAlertAlbum();
        return;
      }

      var imgTag = 'i'+getOrdinal(imageNr) + '-image';
      incImagesNumber(albumName);

      var imagePath = "images/" + picName + ".jpg";
      var imageSrc = "<img name=\""+picName+"\"src=\""+imagePath+"\"onClick=\"processSingleClick(\'"+ imgTag +"\')\">";
      var imagePar = "<p class=\"title\">" + picName + "</p>";
      $('.image-box > div.' + imgTag).append(imageSrc);
      $('.image-box > div.' + imgTag).append(imagePar);
    }

    //photo selected
    else {
      var albumName = contentSelected;
      var imageNr = getImagesNumber(contentSelected);

      if(imageNr == 5){
        betaVersionAlertAlbum();
        return;
      }

      var imgTag = 'i'+getOrdinal(imageNr) + '-image';
      incImagesNumber(contentSelected);

      var picName = $('.image-box > div.' + selectedImage + ' > img').attr('name');
      var imagePath = "images/" + picName + '.jpg';
      var imageSrc = "<img name=\""+picName+"\"src=\""+imagePath+"\"onClick=\"processSingleClick(\'"+ imgTag +"\')\">";
      var imagePar = "<p class=\"title\">" + picName + "</p>";
      var date = $('.image-box > div.' + selectedImage + ' > p.date').text();
      changeMenu(actualMenu,albumName);
      $('.image-box > div.' + imgTag).append(imageSrc);
      $('.image-box > div.' + imgTag).append(imagePar);
      par = "<p class=\"date hide\">" + date + "</p>";
      $('.image-box > div.' + imgTag).append(par); 
      par = "<p class=\"description hide\"></p>";
      $('.image-box > div.' + imgTag).append(par); 

    }

    $('#my-success-alert-albumlist').show();

    pressButton('albuns');

    //forçar a guardar no localStorage
    changeMenu(actualMenu,actualMenu);
  }

   function executeExitReq(exit,type){
    if(type == 'show'){
      $('#'+exit).show();
    }else if(type == 'confirmar'){
      $('.exitPic').show();
      hideBox('#my-alert-exit')
    }else if(type == 'cancelar'){
      console.log("cancel");
      $('#'+exit).hide();
    }
  }

  function toggleExitPic(){
     $('.exitPic').hide();
  }

  function getOrdinal(n) {
    var s=["th","st","nd","rd"],
        v=n%100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
  }
  
  function incImagesNumber(menu){
     switch(menu){
      case 'photos' :{
        imagesPhotosNumber++;
        break;
      }
      case 'photos2nd' :{
        imagesPhotos2ndNumber++;
        break;
      }
      case 'albuns' :{
        imagesAlbunsNumber++;
        break;          
      }
      case 'animations' : {
        imagesAnimationsNumber++;
        break;
      }
      case 'postcard' : {
        imagesPostcardNumber++;
        break;
      }
      case 'portugalAlbum' : {
        imagesAlbumPortugalNumber++;
        break;
      }
     case 'spainAlbum' : {
        imagesAlbumSpainNumber++;
        break;
      }
     case 'franceAlbum' : {
        imagesAlbumFranceNumber++;
        break;
      }
    case 'germanyAlbum' : {
        imagesAlbumGermanyNumber++;
        break;
      }
    case 'shares' : {
        imagesSharesNumber++;
        break;
      }
      default: break;
    }
  }

  function getImagesNumber(menu){
     switch(menu){
      case 'photos' :{
        return imagesPhotosNumber;
        break;
      }
      case 'photos2nd' : {
        return imagesPhotos2ndNumber;
        break; 
      }
      case 'albuns' :{
        return imagesAlbunsNumber;
        break;          
      }
      case 'animations' : {
        return imagesAnimationsNumber;
        break;
      }
      case 'postcard' : {
        return imagesPostcardNumber;
        break;
      }
      case 'portugalAlbum' : {
        return imagesAlbumPortugalNumber;
        break;
      }
     case 'spainAlbum' : {
        return imagesAlbumSpainNumber;
        break;
      }
     case 'franceAlbum' : {
        return imagesAlbumFranceNumber;
        break;
      }
    case 'germanyAlbum' : {
        return imagesAlbumGermanyNumber;
        break;
      }
    case 'shares' : {
        return imagesSharesNumber;
        break;
      }
      default: break;
    }
  }

  function alertProcessor(from, type, option){

    $('#' + from).hide();

    if(type == 'confirmar'){

      switch(option){
        case 'animations' : {
          executeAnimation();
          break;
        }
        case 'edition' : {
          executeEdition();
          break;
        }
        case 'share' : {
          executeShareReq();
          $('#my-success-alert-share').show();
          break;
        }
        case 'postcards' : {
          executePostcardReq();
          break;
        }
        case 'photolist' : {
          executeAddPhotoToAlbumReq(false);
          break;
        }
        case 'albumlist' : {
          executeAddPhotoToAlbumReq(true);
          break;
        }
        case 'importphoto' : {
          importPhoto(type);
          break
        }
        default: break;
      }
    }

    else {//cancelar
      if(selectedImage == null){
        showModal('#my-' + option + '-modal');
      }
      console.log("cancel");
    }
  }

  function importPhoto(type){

    if(type == 'confirmar'){
      var picName = contentSelected;
      changeMenu(actualMenu, 'photos');
      var imageNr = getImagesNumber(actualMenu);

      if(imageNr == 5){
        changeMenu(actualMenu, 'photos2nd');
        imageNr = getImagesNumber(actualMenu);
        console.log("First IF");
        console.log(imageNr);
      }

      console.log("AFTER IF");
      console.log(imageNr);

      if(imageNr == 5){
        console.log("Aqui");
        betaVersionAlertPhoto();
        return;
      }
  
      var imgTag = 'i'+getOrdinal(imageNr) + '-image';
      incImagesNumber(actualMenu);
      var imagePath = "images/" + picName + ".jpg";
      var imageSrc = "<img name=\""+picName+"\"src=\""+imagePath+"\"onClick=\"processSingleClick(\'"+ imgTag +"\')\">";
      $('.image-box > div.' + imgTag).append(imageSrc);
      var imagePar = "<p class=\"title\">" + picName + "</p>";
      $('.image-box > div.' + imgTag).append(imagePar);
      imagePar = "<p class=\"date hide\">24/11/2012</p>";
      $('.image-box > div.' + imgTag).append(imagePar);
      imagePar = "<p class=\"description hide\"></p>";
      $('.image-box > div.' + imgTag).append(imagePar);
      			
			//Inserir foto solta no modal (primeiro nivel) albumPhotoList
			var onClickFunction = 'onClick=\"findImage(\'invalid\',\'' + picName + '\'),confirmModalSelection(\'#my-albumPhotoList-modal\')\"';
			$(modal1stLevel).append("<li><a href=\"#\" " + onClickFunction +  "\"><img src=" + imagePath +" class=\"img-pos\">" + picName + " </img> </a></li>");
			
			//Inserir foto no modal photoList
			var onClickFunction = 'onClick=\"setContentSelectedVariable(\'' + picName + '\'),confirmModalSelection(\'#my-photolist-modal\')\"';
			var modalLevel ='#my-photolist-modal > div#first-level-photolist-list > ul#navigation';
			$(modalLevel).append("<li><a href=\"#\" " + onClickFunction +  "\"><img src=" + imagePath +" class=\"img-pos\">" + picName + " </img> </a></li>");
			
  		//obrigar a guardar a nova pagina no local storage
  		changeMenu(actualMenu,actualMenu);
      $('#my-success-alert-importphoto').show();
			 
    } else //cancelar
          {
            console.log("cancel");
            $('#my-alert-photo').hide();
          }
  }

  function showModal(modal){
    $(modal).modal('show');
  }

  function hideModal(modalName){
    $(modalName).modal('hide');
		
	
		if(levelOfModal != 1){
			var name = modalName.substring(4,modalName.length - 6);
			backButton('albumPhotoList');
		}		
  }

  function confirmModalSelection(name){
		hideModal(name);

    var selectedName = $('.image-box > div.' + selectedImage + ' > img').attr('name');

    switch(name){
      case '#my-photos-modal' :{
        $('#my-alert-importphoto > h4').text("Deseja confirmar a importação da fotografia " + contentSelected + " para a aplicação?");
        $('#my-alert-importphoto').show();
        break;
      }
      case '#my-albumPhotoList-modal' :{
				if(operation!='postcards'){
          // getRealNameMenu: usei esta função para retornar também os nomes das operações
          $('#my-alert-animations > h4').text("Deseja confirmar a criação da animação " + getRealNameMenu(operation) + " a partir da fotografia " + contentSelected +"?");
					$('#my-alert-animations').show();
        }
				else{
          // getRealNameMenu: usei esta função para retornar também os nomes das operações
          $('#my-alert-postcard > h4').text("Deseja confirmar a criação do postal a partir da fotografia " + contentSelected + "?");
					$('#my-alert-postcard').show();
        }
        break;
      }
      case '#my-friends-modal' :{
        $('#my-alert-share > h4').text("Deseja confirmar a partilha da fotografia " + selectedName + " com o seu amigo " + friendforShare + "?");
        $('#my-alert-share').show();
        break;          
      }
      case '#my-photolist-modal' : {
        console.log(selectedName);
        if(actualMenu == 'albuns')
          $('#my-alert-photolist > h4').text("Deseja confirmar a adição da fotografia " + contentSelected + " ao álbum " + getRealNameMenu(selectedName) + "?");
        else
          $('#my-alert-photolist > h4').text("Deseja confirmar a adição da fotografia " + contentSelected + " ao álbum " + getRealNameMenu(actualMenu) + "?");
        $('#my-alert-photolist').show();
        break;
      }
      case '#my-albumlist-modal' : {
        $('#my-alert-albumlist > h4').text("Deseja confirmar a adição da fotografia " + selectedName + " ao álbum " + getRealNameMenu(contentSelected) + "?");
        $('#my-alert-albumlist').show();
        break;
      }
      default: break;
    }
  }

function enterInsideModalMenu(menu){
    var footer = menu + '-footer';
    var body = menu  + '-list';
    var aux;
    var aux2;

		levelOfModal++;
		addPhotosTo2ndModal();
		
    /* Change Menu Body */
    aux = $('#first-level-' + body).html();
    $('#first-level-' + body).html($('#second-level-' + body).html());
    $('#second-level-' + body).html(aux);

    /* Change Footer */
    aux2 = $('#first-level-' + footer).html();
    $('#first-level-' + footer).html($('#second-level-' + footer).html());
    $('#second-level-' + footer).html(aux2);
  }

  function backButton(menu){
    var footer = menu + '-footer';
    var body = menu + '-list';
    var aux;
    var aux2;
		
		
		levelOfModal--;

    /* Change Menu Body */
    aux = $('#first-level-' + body).html();
    $('#first-level-' + body).html($('#second-level-' + body).html());
    $('#second-level-' + body).html(aux);

    /* Change Footer */
    aux2 = $('#first-level-' + footer).html();
    $('#first-level-' + footer).html($('#second-level-' + footer).html());
    $('#second-level-' + footer).html(aux2);

    $(modal2ndLevel + '> li').remove();
  }

  

  function findImage(albumName,imageName){		
    var albumContent = localStorage.getItem(albumName);
    var nr_images = getImagesNumber(albumName);
		var flag = false;
    //feio
		if(albumName != 'invalid'){
			$('.backup-div').html(albumContent);

			for(i=0; i < nr_images-1;i++){
				var imgTag = 'i'+getOrdinal(i+1) + '-image';
				var picname = $('.backup-div > div.' + imgTag + '> img').attr('name');
				if(imageName == picname){
					flag = true;
					modalSelectedImage = imgTag;
					break;
				}
			}
		}
  
		if(flag == false){
			//mais feio, ainda para fazer
			albumContent = localStorage.getItem('photos');
			nr_images = getImagesNumber('photos');
		
			//feio
			$('.backup-div').html(albumContent);
			
			for(i=0; i < nr_images-1;i++){
				var imgTag = 'i'+getOrdinal(i+1) + '-image';
				var picname = $('.backup-div > div.' + imgTag + '> img').attr('name');

				if(imageName == picname){
					modalSelectedImage = imgTag;
					break;
				}
			}
		}
  }

  function createOrderedAlbumByAZ(pictureOrder){

    // FEIO
    $('.image-box').html("");
    $('.image-box').append("<div class=\"i1st-image\"></div>");    
    $('.image-box').append("<div class=\"i2nd-image\"></div>");    
    $('.image-box').append("<div class=\"i3rd-image\"></div>");    
    $('.image-box').append("<div class=\"i4th-image\"></div>");

    for(i=0; i < pictureOrder.length; i++){

      imgName = pictureOrder[i];
      imgTag = "i" + getOrdinal(i+1) + "-image";

      var img = "<img name=\""+ imgName + "\" src=\"images\/" + imgName + ".jpg\" onClick=\"processSingleClick(\'" + imgTag+ "\')\">";
      var par = "<p class=\"title\">" + imgName + "</p>";
      $('.image-box > div.' + imgTag).append(img);
      $('.image-box > div.' + imgTag).append(par);

    }
    hideSidebar();
    localStorage.setItem(actualMenu, $('.image-box').html()); 
  }


  function createOrderedAlbumByZA(pictureOrder){

    // FEIO
    $('.image-box').html("");
    $('.image-box').append("<div class=\"i1st-image\"></div>");    
    $('.image-box').append("<div class=\"i2nd-image\"></div>");    
    $('.image-box').append("<div class=\"i3rd-image\"></div>");    
    $('.image-box').append("<div class=\"i4th-image\"></div>");

    var j=0;
    for(i = pictureOrder.length -1; i > -1; i--){

      imgName = pictureOrder[i];
      imgTag = "i" + getOrdinal(++j) + "-image";

      var img = "<img name=\""+ imgName + "\" src=\"images\/" + imgName + ".jpg\" onClick=\"processSingleClick(\'" + imgTag+ "\')\">";
      var par = "<p class=\"title\">" + imgName + "</p>";
      $('.image-box > div.' + imgTag).append(img);
      $('.image-box > div.' + imgTag).append(par);
    }

    hideSidebar();
    localStorage.setItem(actualMenu, $('.image-box').html()); 
  }

  function executeOrganizeName(type){

    if(actualMenu == 'albuns'){
      betaVersionOrganizeAlert();
      return;
    }
    var nr_images = getImagesNumber(actualMenu);
  
    var pics =[nr_images];
  
    for(i=0; i < nr_images-1;i++){
      var imgTag = 'i'+getOrdinal(i+1) + '-image';
      console.log(imgTag);
      var picName = $('.image-box > div.' + imgTag + '> img').attr('name');
      console.log(picName);
      pics[i] = picName;
    } 
      
    pics.sort();
    console.log(pics);

    if(type == 'AZ')
      createOrderedAlbumByAZ(pics);
    else
      createOrderedAlbumByZA(pics);

    //force
    changeMenu(actualMenu, actualMenu);
  }

  function resizeReset(){
    $('.image-selected').height('2.93cm');

    $('.image-box > div').width('4.4cm');
  
    $('.i1st-image').css('left', '1.5cm');
    $('.i3rd-image').css('left', '1.5cm');
    $('.i2nd-image').css('left', '7.1cm');
    $('.i4th-image').css('left', '7.1cm');

    $('.i1st-image-caret-button').css('left', '5.2cm');
    $('.i1st-image-caret-button').css('top', '3cm');

    $('.i2nd-image-caret-button').css('left', '10.7cm');
    $('.i2nd-image-caret-button').css('top', '3cm');

    $('.i3rd-image-caret-button').css('left', '5.1cm');
    $('.i3rd-image-caret-button').css('top', '6.5cm');

    $('.i4th-image-caret-button').css('left', '10.7cm');
    $('.i4th-image-caret-button').css('top', '6.5cm');
  }

  function resize(){
    $('.image-selected').width('3.5cm');
    $('.image-selected').height('2.35cm');
    $('.image-box > div').width('3.5cm');

    $('.i1st-image').css('left', '1cm');
    $('.i3rd-image').css('left', '1cm');
    $('.i2nd-image').css('left', '5.4cm');
    $('.i4th-image').css('left', '5.4cm');

    $('.i1st-image-caret-button').css('left', '3.8cm');
    $('.i1st-image-caret-button').css('top', '2.4cm');

    $('.i2nd-image-caret-button').css('left', '8cm');
    $('.i2nd-image-caret-button').css('top', '2.4cm');

    $('.i3rd-image-caret-button').css('left', '3.6cm');
    $('.i3rd-image-caret-button').css('top', '5.8cm');

    $('.i4th-image-caret-button').css('left', '8cm');
    $('.i4th-image-caret-button').css('top', '5.8cm');

  }

  function loadDescriptionForm(source){
    var name = $('.' + source + ' > img').attr('name');
  	var form = localStorage.getItem(name + 'description')

    if(form != null)
  	   $('.content-form').html(form);
    else {
      setContentEditable(true);
      $('.formDesc').text("Adicione uma descrição...");
      localStorage.setItem(name + 'description', $('.content-form').html());
  	}
  }

  function saveDescriptionForm(source){
    var form = $('.content-form');
    var name = $('.' + source + ' > img').attr('name');
 	 	localStorage.setItem(name + 'description', form.html());
  }

  function changeButtonColor(id){

    switch('#'+id){
      case '#photosB':
      case '#albunsB':
      case '#animationsB':
      case '#postcardsB':
      case '#friendsB':
      case '#sharesB': {
        $(currentButton).addClass('btn-primary');
        $('#'+id).removeClass('btn-primary');
        currentButton = '#'+id;
        break;
      }
	    case '#franceAlbumB':
	    case '#portugalAlbumB':
	    case '#spainAlbumB':
	    case '#germanyAlbumB': {
		  	$(currentButton).addClass('btn-primary');
          $('#albunsB').removeClass('btn-primary');
          currentButton = '#albunsB';
          break;
	  	}
      default: break;
    }
  }

  function setFriendforShare(name){
		friendforShare = name;
  }

  function setContentSelectedVariable(name){
    contentSelected = name;
  }
	
	function setModalAlbum(name){
		modalAlbum = name;
	}
	
	function setOperation(name){
		operation = name;
	}
  
  function hideBox(name){
    $(name).hide();
  }

  function removePhotoFromModal(name){
    $('#' + contentSelected + 'Pic').addClass('hide');
  }

  function changeInfoStatus(){
    if(infoActive){
      infoActive = !infoActive;
      $('.info-button > button').toggleClass('active', false);
    }
  }

  function processInfoReq(){

    if(!$('.info-button > button').hasClass('disabled')){
      infoActive = !infoActive;

      if(infoActive){
        resize();
        showSidebar(selectedImage);
        $('#keyboard').fadeIn();
      }
      else {
        $('#keyboard').fadeOut();
        hideSidebar();
        resizeReset();
      }
    }
  }

  function processChangeDescriptionReq(){
    if(!infoActive){
      infoActive = !infoActive;
      resize();
      showSidebar(selectedImage);
      $('.info-button > button').toggleClass('active', true);
      setContentEditable(true);
      $('#keyboard').fadeIn("slow");
    }
  }

	
	function addPhotosTo2ndModal() { //procura todas as fotos que existem no album e coloca no 2º menu do modal
		var albumContent = localStorage.getItem(modalAlbum);
    var nr_images = getImagesNumber(modalAlbum);
		
    $('.backup-div').html(albumContent);

    for(i=0; i < nr_images-1;i++){
      var imgTag = 'i'+getOrdinal(i+1) + '-image';
			var imgSrc= $('.backup-div > div.' + imgTag + '> img').attr('src');
      var imgName = $('.backup-div > div.' + imgTag + '> img').attr('name');
			
			var onClickFunction = 'onClick=\"setContentSelectedVariable(\'' + imgName + '\'), findImage(\''+ modalAlbum +'\',\'' + imgName + '\'),confirmModalSelection(\'#my-albumPhotoList-modal\')';
      var li = "<li><a href=\"#\" " + onClickFunction +  "\"><img src=\"" + imgSrc +"\"class=\"img-pos\">" + imgName + " </img> </a></li>";
      $(modal2ndLevel).append(li);
  	}
  }

  function processEnterReq(source){
    if(actualMenu == 'albuns'){
      var albumName = $('.' + source + ' > img').attr('name').toLowerCase();
      changeMenu(actualMenu, albumName+'Album');
    }
    else {
      $('#my-warning-notWorking').show();
    }
  }

  function setContentEditable(value){
    var desc = $('.formDesc');
    var button = $('.btt-pos1 > input');

    if(value){
      desc.attr('contenteditable', true);
      desc.css('background-color', '#ffffff');
      button.val('Guardar');
    }
    else {
      desc.attr('contenteditable', false);
      desc.css('background-color', '#DEF');
      button.val('Editar');
    }
  }

  function buttonClick(){
   
    if($('.formDesc').attr('contenteditable') == "true"){
      setContentEditable(false);
      $('#keyboard').fadeOut();
    }
    else {
      setContentEditable(true);
      $('#keyboard').fadeIn("slow");
    }

    saveDescriptionForm(selectedImage);
  }

  function processChangePageReq(page){
    $('#my-pagination > a').removeClass('current');
    $('#my-pagination > a.' + page).addClass('current');
  
    switch(page){
      case 'page-1st':{
        menu('photos');
        break;
      }
      case 'page-2nd':{
        menu('photos2nd');
        break;
      }
      default: break;
    }
  }

  function processHelpReq(type){
    if(type == 'show'){
      if(actualMenu != 'albuns')
        $('.helpImage').show();
      else
          $('.helpImage2').show();
    }
    else{
      if(actualMenu != 'albuns')
        $('.helpImage').hide();
      else
          $('.helpImage2').hide();
    }
  }

  function betaVersionAlertPhoto(){
    $('#beta-version-photo-alert').show();    
  }

  function betaVersionAlertAlbum(){
    $('#beta-version-album-alert').show();    
  }

  function betaVersionOrganizeAlert(){
    $('#beta-version-organize-alert').show();
  }