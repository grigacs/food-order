Justice League team

Members: Richard Asztalos (active)
	 Adel Csucs (inactive)
	 Gergely Der (active)
	 Tamas Kapitany (inactive)


Setup:
 - to run server open food-server folder, open cmd and run: 'node index.js'
 - to run the application (JIT): npm start 


Requirements:
Alap elv�r�sok (30 pont):
		Projekt mefelel�en legyen strukt�r�lva (pipa)

		Feature-�k legyenek modulokra bontva   (pipa)

		Tilos k�zvetlen�l DOM-ot manipul�lni!  (pipa)
			A DOM manipul�ci� csak akkor megengedett, ha nem lehet angularral megoldani! B�vebben
			Tan�csok:
			Ker�ld el, ha lehet!
			Haszn�ld k�r�ltekint�en, ha sz�ks�ges! (pipa)

		Legal�bb 4.x.x Angular haszn�lata      (pipa)
		Ford�that�s�g JIT �s AOT m�dban        (pipa)
		Kommentezett forr�sk�d		       (pipa)
		Git verzi�kezel� rendszer haszn�lata   (pipa)


Elk�sz�tend� funkci�k (45 pont):
		Legal�bb 3 route		       (pipa)

		Legal�bb 3 module, legal�bb 1 lazy loaded module  (pipa)

		Legal�bb 1 service (pipa)

		Legal�bb 1 direkt�va (ami nem komponens)(pipa)

		Legal�bb 10 (�rtelmes) komponens        (pipa)
	
		Legal�bb 1 (�rtelmes) form              (pipa)

		Legal�bb 1 pipe                         (pipa)


4 f�s csapat eset�n m�g k�telez�:
		Anim�ci�k haszn�lata                    (pipa)

		+3 komponens                            (pipa)

		+1 form, pipe, direkt�va vagy service   (pipa)




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


More: - bootstrap css (ngx-valor)
      - JSON processing (via own server)
      - Assets (pictures, db)

