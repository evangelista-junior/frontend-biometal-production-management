# Production Management - Frontend

## The goal of this project was have whole production process in hands, so that the collaborator could do better decisions.

I divide the front end in basically four parts:

1 - <b>Process Map: </b>in this page, all the process are listed with your orders respectvly, being each card an order. Besides, we can select some filters like date target,    visualization layout (we talk about in a few moment), checkbox of product types showed (in case false, all orders are showed, including raw products), and a search   order input. In each process listed, we can see each card (order) with your status and color, being: green (in process), orange (waiting process and is from current date target), grey (waiting process but isn't from current date target), red (late orders waiting process), purplet (priority setted in ERP systema).

2 - <b>Summary orders: </b>there, the sales team can see the orders planned for each week target and using that information they can send a target to delivery customer orders. This page shows every week that contains any order, we just have to click in it to show orders detail.

3 - <b>Layouts: </b> This page envolves some CRUD functions, so I've decided to protect it using a login system. Being logged, the registered layouts are being showed with all process in it, so if we want, we can delete it or create a new layout to visualizate the process in process map.
