# TODO


Brutally rebuild everything every time!

Fix remove item context menu


Add details pane to current Project in header view
Goal: every view could stand on its own. 
It should be added as a child by its parent

1. When selecting an item in the SummaryView, it re-renders, and thus scrolls to the top. Irritating. Maybe make it so that selecting only updates the detail view.
2. Get rid of the clunky double click sensor


# TODO
1. Add to Github

Move logic for taskSummaryViews and projectSummaryView to their classes from 


ProjectPageView
   HeaderView
      BreadCrumbs
   ContentView
      SummaryView
         SummaryContents
            Toolbar
            TaskSummaryView(s)
            ProjectSummaryView(s)
      DetailsView
   FooterView


