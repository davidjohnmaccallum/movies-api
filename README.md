# Movies API

I have been asked to do a little full stack code assignment. The task is to create a program with basic CRUD functionality for maintaining a list of movies. This is the backend API. It is written using NodeJS, TypeScript and Express.

Though this program is simple I want to try to make it production quality. I want to demonstrate coding skills, architecture skills, testing skills and also an awareness of systems administration (ie code that is easy to debug). 

## Getting Started

I am using node 8.9.

```bash
git clone git@github.com:davidjohnmaccallum/movies-api.git
cd movies-api/
npm install
npm run build
npm run test
npm run testcoverage # Test coverage report created in /coverage
npm start
```

## Design Decisions

### Context

This is a really simple little sample program so you are going to have to use your imagination. Imagine that our company rents out VHS video tapes to retro enthusiasts who love VHS and still have VHS plays that work. Imagine that this program is part of a microservices architecture. It is part of a wider ecosystem of loosely coupled little programs working together to do useful things for our customers and our staff. This microservice (little program) is part of the product catalogue which might be part of an online shopfront. Imagine there are other microservices in the environment that handle fulfillment and billing for example.

### Domain Driven Design

I [Domain Driven Design](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) by Eric Evans a few years ago and it has heavily influenced the way I design software. The main design document I use when creating a software product is a domain model. [Here is the sample domain model](https://docs.google.com/presentation/d/1_yONfk85fDQgVrfn6n24JFWbDaFBSOl5C4iLbZ8DeHI/edit?usp=sharing) I created for this assignment (note I have only written code for the Movie entity). Two DDD patterns I find especially useful are [Ubiquitous Language](https://martinfowler.com/bliki/UbiquitousLanguage.html) and [Bounded Context](https://martinfowler.com/bliki/BoundedContext.html). Ubiquitous Language makes a team conscious of how we are engaged in design whenever we speak to one another and how the careful use of language leads to better software. Bounded Context helps to organise microservices into loosely coupled groups. This is very useful when want to divide up the development work between multiple independent teams. In our imaginary example the bounded contexts might be: online shop, fulfilment and billing. This microservice would be part of the online shop bounded context.

### The Role of an API

APIs are very important parts of the system, especially when taking a domain model first approach to design. In the API the concepts in the domain model become concrete. Entities are defined (ie what fields do they have) and data rules are enforced (eg validation rules). A rich domain model requires a rich API. At the same time the API must remain as simple as possible if it is to be maintainable. This is achieved by focusing the API on the task of being the data gatekeeper and letting other microservices do the other jobs within the online shop bounded context. For example, if we wanted to recommend related movies to the customer I would resist the temptation to put this logic into the Movies API and rather create an independent "Movie Recommendations" microservice.

### TypeScript

As our domain models became richer (a good thing) our APIs became more complex and required periodic refactoring. At Privyseal we initially wrote our APIs in plain JavaScript but then migrated them to TypeScript. There were a few reasons for this: I found refactoring TypeScript much easier than plain JavaScript because the IDE (VS Code) would catch a lot of the errors. I see defining types as a type of unit test. TypeScript also allowed us to richly model our domain entities ([src/model/Movie.ts](https://github.com/davidjohnmaccallum/movies-api/blob/master/src/model/Movie.ts) for example). Finally TypeScript allowed us to make better use of Object Oriented Design (OOD) patterns which are important for data modelling.

### The Data Layer

The API follows the Model View Controller (MVC) pattern. The data entities are defined in the [src/model](https://github.com/davidjohnmaccallum/movies-api/tree/master/src/model) folder. Data persistence code is in the [src/dataaccess](https://github.com/davidjohnmaccallum/movies-api/tree/master/src/dataaccess) folder (specifically separated out for testability). I am using the [Active Record pattern](https://www.martinfowler.com/eaaCatalog/activeRecord.html) because I like how it reads (eg Movie.findAllByActor('Harrison Ford')).

### The Controller Layer

I have chosen to store the business logic of the API in the controller layer ([src/controller](https://github.com/davidjohnmaccallum/movies-api/tree/master/src/controller)) following the [Transaction Script pattern](https://martinfowler.com/eaaCatalog/transactionScript.html). By doing this the controller functions become the focal points for my tests. The controller function uses the data model, the infrastructure services (messaging, logger) and possibly other business services (none in this simple example) to help it get the work done.

### Life Cycle Events

In [Building Microservices](https://www.oreilly.com/library/view/building-microservices/9781491950340/) Sam Newman says: "Without decoupling, everything breaks down for us. The golden rule: can you make a change to a service and deploy it by itself without changing anything else?".

Entity life cycle events help with this. They provide useful triggers for other microservices. They are an important decoupling mechanism for keeping the API microservice clean and focused on its job and allowing other jobs to be done by other microservices. You will see in [movieController.ts](https://github.com/davidjohnmaccallum/movies-api/blob/master/src/controller/movieController.ts) that I am publishing an event when a movie is created, updated and deleted. In a real world API there would be a richer set of life cycle events (eg movieRatedByCustomer). I would create a document called an "Event Catalogue" where I would list and describe the events so that other team members can make use of them. Like a less technical version of the [Android Activity Lifecycle document](https://developer.android.com/reference/android/app/Activity.html#ActivityLifecycle).

### Logging

One of the most important features when it comes to debugging an issue in production is logging. A central log database (eg Elasticsearch) is important in a distributed system. A powerful data analysis tool (eg Kibana) is also important for analysing the logs. (I find log file analysis a great way to work on my BI skill.) Feeding infrastructure logs (HTTP access logs, Unix syslogs, security logs etc) into the same central log database allows valuable cross referencing between these logs.

Error logging is very important. An error log should tell you what the program was doing and include an accurate stack trace pointing to the line of code where the error originated.

I include a [correlation ID](https://hilton.org.uk/blog/microservices-correlation-id) with my log messages. I have found this to be a very important logging feature in loosely coupled, event driven systems. It is very easy to loose track of what is going on when you have lots of events flying around and triggering processes. By including a correlation ID in your log messages (eg an HTTP session ID or a transaction ID) and passing the correlation ID between processes in the HTTP header or the event message header you can filter your logs and see all the log messages for a given transaction/user session across all microservices.

APIs can be a performance bottleneck so I have performance logging on each of the controller functions. Kibana allows me to graph these very nicely.

### API User Documentation

For users of the API I have used the really handy feature of Postman to create [online API docs here](https://documenter.getpostman.com/view/7984062/S1a7UQdT?version=latest).

I like to create client libraries for my APIs and include rich documentation and data definitions in the client library. I will showcase this when I build out the frontend part of this assessment.


### Testing and Test Driven Development

The more time I spend working in software development the more I appreciate how important testing and Test Driven Development (TDD) is to the long term health of a system. In this example I have focused my [unit tests](https://github.com/davidjohnmaccallum/movies-api/blob/master/test/moviesController.ts) on the controller which is the brains of the API. I have included a test coverage tool (you can execute it with `npm run testcoverage` and see the results in the /coverage folder).

Unit tests are important because they can be run quickly at development time when bugs can be fixed most quickly. To enable unit testing of the API I have created mocks for external infrastructure ([MovieDataAccessMock.ts](https://github.com/davidjohnmaccallum/movies-api/blob/master/src/dataaccess/MovieDataAccessMock.ts) and [MessageGatewayMock.ts](https://github.com/davidjohnmaccallum/movies-api/blob/master/src/messagegateway/MessageGatewayMock.ts)) and factories which I can [switch into test mode](https://github.com/davidjohnmaccallum/movies-api/blob/master/test/moviesController.ts#L11).

In a real world situation I want several layers of tests including UI (eg Selenium Web Driver) and integration tests (with the program connected to a real database and messaging system). I see type definitions (ie TypeScript) as a form of quality control and I also use lint as another layer of quality control. The build system (eg Jenkins) would run these tests and be the gatekeeper preventing failing code from being deployed.

I came across this article recently which I really like: [The best ways to test your serverless applications](https://www.freecodecamp.org/news/the-best-ways-to-test-your-serverless-applications-40b88d6ee31e/).

### Monitoring

I have not included any monitoring but this is essential. In production you need performance monitoring (eg CPU, Network, Disk IOPS, Disk Space, Memory Usage) and availability monitoring (eg Pingdom).

### Security and Data Privacy

I did not include security in the code for the sake of time. It is very important. The level of security to apply to a system depends on the sensitivity of the data being stored. The data should be categorised as part of the design process (eg restricted data, private data, public data). 

Data encryption in transit and at rest is becoming easier to implement and I would apply these by default. At Privyseal, because we were working with personal data, we worked hard to conform to the EUs Global Data Protection Regulations (GDPR).

Within a cloud computing network I follow the Principle of least privilege. Traffic between virtual servers must be encrypted and firewalls should be in place on each virtual server restricting access. This is important in the event that the network is compromised. If a hacker gets into the network they hit another layer or protection.

## Infrastructure

This little program is a microservice which runs in a Docker container. I did not want to go through a lengthy process of setting up infrastructure so I followed the path of least resistance. I ended up with the following infrastructure and build pipeline.

The program is running on AWS Elastic Container Service (ECS) Fargate. This was very quick to set up. The only issue I encountered was intermittent 503s. Tweaking the ELB health check URL fixed this.

I am using Docker Hub as my build server. Also, very quick to set up. You can view the container here [davidjohnmac/movies-api](https://hub.docker.com/r/davidjohnmac/movies-api).

The build pipeline is:

1. Push a new commit to master on GitHub.
2. This triggers Docker Hub to build a new container image. During the build process the TypeScript is transpiled, linted and the unit tests are executed. If any of this fails the build fails.
3. This triggers AWS Fargate to update the running API.

In a real world situation I would want a Development, Staging and Production environment. With the ability to do [Blue Green Deployments](https://martinfowler.com/bliki/BlueGreenDeployment.html) by alternating staging and production.