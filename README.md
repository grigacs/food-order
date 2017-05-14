Justice League team

Members:

      Richard Asztalos (active)
	  Adel Csucs (inactive)
	  Gergely Der (active)
	  Tamas Kapitany (inactive)
   


Setup:

    - to run server open food-order-server folder, open cmd there and run: 'node index.js'
 
    - to run the application (JIT): npm start 
 
    - app in the browser: localhost:4200
 
    - server in the browser: localhost:8100/database


Requirements: Alap elvárások (30 pont):
		
    Projekt mefelelően legyen struktúrálva (pipa)

		Feature-ök legyenek modulokra bontva   (pipa)

		Tilos közvetlenűl DOM-ot manipulálni!  (pipa)
			A DOM manipulució csak akkor megengedett, ha nem lehet angularral megoldani! Bővebben
			Tanácsok:
			Kerüld el, ha lehet!
			Használd körültekintően, ha szükséges! (pipa)

		Legalább 4.x.x Angular használata      (pipa)
    
		Fordíthatóság JIT és AOT módban        (pipa)
    
		Kommentezett forráskód		       (pipa)
    
		Git verziókezelő rendszer használata   (pipa)


Elkészítendő funkciók (45 pont):

		Legalább 3 route		       (pipa)

		Legalább 3 module, legalább 1 lazy loaded module  (pipa)

		Legalább 1 service (pipa)

		Legalább 1 direktíva (ami nem komponens)(pipa)

		Legalább 10 (értelmes) komponens        (pipa)
	
		Legalább 1 (értelmes) form              (pipa)

		Legalább 1 pipe                         (pipa)


4 fős csapat esetén még kötelező:

		Animíciók használata                    (pipa)

		+3 komponens                            (pipa)

		+1 form, pipe, direktíva vagy service   (pipa)




Components:

	01.) Admin
	02.) Admin Orders
	03.) Carousel
	04.) Cart
	05.) Cart-collapse
	06.) Contact
	07.) Food-order
	08.) Header
	09.) Login
	10.) Main
       	11.) Page-not-found
	12.) Register
	13.) Users

Sevices:

	1.) GetFoods (getdata)
	2.) GetUsers (getdata)
	3.) GetMyOrders (getdata)
	4.) GetOrders (getdata)
	5.) GetUser (getdata)
	6.) Cart-service
	7.) Session-service
	8.) Communication-service
	

Modules:

	1.) RegisterModule (register)
	2.) AdminOrdersModule (admin-orders)
	3.) LazyModule (lazy -> for users component)
	


Directives:

	1.) Click-outside


Guards:

	1.) Activate-register
	2.) Admin


Routing: 

	- in the AppModule (routing with guard)
	- AdminOrders Module (admin-orders own routing)
	- Lazy (in the lazy folder, for users component, own routing)
	

Pipe:

	- uppercase pipe (see more: ContactComponent (html))
	- capitalizePipe (in the app folder, see more: ContactComponent (html))
	- async (see more: ContactComponent (html))
	- date (see more: ContactComponent (html))


Animation:

	- ContactComponent (and in the ContactComponent.html)


More: 

      - bootstrap css (ngx-valor)
      - JSON processing (via own server)
      - Assets (pictures, db)


