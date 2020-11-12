# Template Developer

Template Developer is an Add-in for Microsoft Word that helps you quickly create automated document templates for [Actionstep](https://www.actionstep.com/).

**The problem:** Users have to manually look up and type in mergefield codes when creating Actionstep templates. These can often be difficult to learn, especially for non-technical users, and it is easy to make typographical errors.  For example: `[[FirstInitialWithLastName|pt=Selected__Participant|ifnull=ignore]]` or `[[SP_SalePurchaseDate|fm=%-e_%B_%Y]]`. This becomes more complicated again when using `IF` or `REPEAT` blocks in the template.

Actionstep can also be very particular in its requirements for correctly parsing a mergefield - for example, exact spacing within field codes and using non-curly quotation marks.

**The solution:** A taskpane in Microsoft Word which lets the user select mergefields and common options and automatically insert them into the template.

Check out the 'screenshots' folder for how it looks.

Please note that this project is not officially affiliated with Actionstep.