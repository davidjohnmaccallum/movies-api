# Movies API

I was asked in an interview to do a little full stack code assignment. The program must have basic CRUD functionality for maintaining a list of movies. This is the backend API. It is written using NodeJS, TypeScript and Express.

I wanted to showcase not just NodeJS coding skills but also architecture skills and the ability to create robust software that is testable and easy to debug in production. Here are some of the design decisions I made:

## Design Decisions

### Context

This is a really simple little sample program. So you are going to have to use your imagination. Imagine that our company rents our VHS tapes to retro enthusiasts who love VHS and still have VHS plays that work. Imagine that this program is part of a microservices architecture. It is part of a wider ecosystem of loosely coupled little programs working together to do useful things for our customers and our staff. This little program is part of the product catalogue which might be part of an online shopfront. There might be other little programs that handle fulfilment and billing for example.

### Domain Driven Design

I read a book a few years back called [Domain Driven Design](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) which has heavily infulenced the way I design software. The main design document I use when creating a software product is a domain model. [Here is the domain model](https://docs.google.com/presentation/d/1_yONfk85fDQgVrfn6n24JFWbDaFBSOl5C4iLbZ8DeHI/edit?usp=sharing) I created for this assignment (I have only written code for the Movie entity). Two DDD patterns I find especially useful are [Ubiquitous Language](https://martinfowler.com/bliki/UbiquitousLanguage.html) and [Bounded Context](https://martinfowler.com/bliki/BoundedContext.html). Ubiquitous Language makes a team conscious of how we are engaged in design whenever we speak to one another and how the careful use of language leads to better software. Bounded Context helps to organise microservices into coherent groups which is very useful as the number of microservices grows and you want to divide up the system between multiple independent teams. In this example, the online shop might be a good scope for the bounded context that this API is a part of.

### TypeScript

APIs are very important parts of the system because they provide data definitions and data rules. The Movies API defines what a movie is and what you can do with a movie ([src/model/Movie.ts](https://github.com/davidjohnmaccallum/movies-api/blob/master/src/model/Movie.ts)). At Privyseal we would typically have one API microservice per bounded context (ie per product). Any other microservice that needed access to shared data would access it via the API. The APIs were coded in JavaScript. We found that these API microservices grew quite large and complex. I think this is a good thing. We want out domain models to be rich and expressive. As the APIs grew in complexity and required refactoring we felt a strong incentive to rewrite them in TypeScript. TypeScript allowed us to be very specific about our data definitions and made refactoring much easier.

### The Data Layer

This API is following an Model View Controller (MVC) pattern. The data model in the [src/model](https://github.com/davidjohnmaccallum/movies-api/tree/master/src/model) folder. This is where we define what our entities are and what you can do with them. I really enjoy the readability that the [Active Record pattern](https://www.martinfowler.com/eaaCatalog/activeRecord.html) brings (eg Movie.findAllByActor('Harrison Ford')) and I use it extensively. I have deliberately abstracted the actual database implementation (eg MongoDB, DynamoDB etc) so that an in memory mock database can be used for unit testing.

### The Controller Layer

These are the [Transaction Scripts](https://martinfowler.com/eaaCatalog/transactionScript.html) where the behavior/business logic of the API lives. These controller functions use the entity classes defined in src/model, the infrastructure services defined in src/messagegateway and src/logger and business services (this example is too simple to have any) to do the work of the API. I like to keep my microservices small and focused on a single task so the scope of the controllers is limited to storing and retrieving data and enforcing data rules.

### Lifecycle Events

Our APIs at Privyseal tended to be depended on my many other microservices and therefore there was quite a high risk associated with changes to the APIs. Because of this we wanted to keep them focused on the job or storing and retrieving data but we often wanted to be able to trigger other processes when a data entity changes. Lifecycle events allowed us to do this without making changes to the API program itself. In [movieController.ts](https://github.com/davidjohnmaccallum/movies-api/blob/master/src/controller/movieController.ts) you will see that I am publishing an event when a movie is created, updated and deleted. I am including the data object as part of the event payload for convenience.

### Logging

I think the most important feature when it comes to debugging an issue in production is logging. At Privyseal we write all our logs into Elasticsearch which gives us a really powerful debugging tool. Our infrastructure logging (HTTP access logs, Unix syslogs, etc) also goes into Elasticsearch allowing us to cross reference between these logs easily.

It is really important for error logs to include accurate stack traces.

I include a traceId with my log messages. I have found this to be a very important logging feature in event driven systems. It is very easy to loose track of what is going on when you have events flying around and triggering processes. By including a good traceId in your log messages (eg an HTTP session ID or a transaction ID) and passing this traceId between processes in the HTTP header or the event message header you can filter your logs and see all the log messages for a give transaction/user session across all microservices. This traceId can even be sent across to third party systems to allow support teams to more easily resolve integration issues.

The business 
 
* Emit change events
* Strong types
* Client library
* Error logging
* Postman project

Abstracting data access layer.

Missing authentication.

Out of scope:

* Security: Authentication and HTTPS