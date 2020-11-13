A Journey Through MergeSort in Javascript
=========================================

[![Shmuel Lotman](https://miro.medium.com/fit/c/96/96/0*ytOTzj6MnVXfGROn.)](https://medium.com/@shmuel.lotman?source=post_page-----b9c98e59629d--------------------------------)[Shmuel Lotman](https://medium.com/@shmuel.lotman?source=post_page-----b9c98e59629d--------------------------------)Follow[Feb 26, 2018](https://medium.com/@shmuel.lotman/a-journey-through-mergesort-in-javascript-b9c98e59629d?source=post_page-----b9c98e59629d--------------------------------) · 11 min read

_Join me in trying to work through MergeSort in depth._

Let me be very clear. I had a good long battle with understanding MergeSort, and it was not an easy one. To me, this algorithm was tricky, and it took me a while, and many console.logs, to figure this out. I did realize that once the actual underlying concept becomes clear, the problem itself becomes a lot easier to work through and implement on your own. So, let’s work through it in the process that worked for me, and if it helps you work through it too, I’ve accomplished something good for the day.

Ok. Let’s begin with an overview of what MergeSort is and what it’s use cases are.

MergeSort belongs to an algorithmic paradigm called “Divide and Conquer.” Divide and Conquer utilizes a three step approach to solving an issue:

1.  Divide: Split the larger problem into smaller, more manageable subproblems.
2.  Conquer: Use recursion to solve the subproblems.
3.  Combine: Put the solutions together into one final answer.

Merge Sort is a perfect example of this process in action. Let’s dissect:

Merge Sort works by doing (essentially) two things:

*   Divide the unsorted list (our original input array) into n number of sublists, each containing 1 element (a list of 1 element is considered sorted, so basically we mean keep recursively slicing away at the original array until you arrive at arrays with length 1).
*   Repeatedly merge your sublists to produce new sorted sublists until there is only 1 sublist remaining. This will be the sorted list.

In order to accomplish this, there will be two functions utilized: the slicing and dicing one, and the actual sorting one. Using these two, we will be able to cleanly achieve a sorted array.

Before we start, it’s cool to know that Merge Sort is used in a few important scenarios:

1.  When you need a stable sorting algorithm: stable algorithms will always return objects with the same key in input in the same order at output, so implementing multiple successive sorts will not cause you to lose the previous sorts.

Example: Let’s say you are sorting a bunch of first and last names. You have:

*   Adam, B
*   Landry, B
*   Jones, C
*   Ericks, B
*   Bendrix, C

If you sort them by the first letter of the last name alphabetically, you will get:

*   Adam, B
*   Bendrix, C
*   Ericks, B
*   Jones, C
*   Landry, B

This is great, but what if we _then_ wanted to sort them by the first letter as well, in order to create groups? An stable algorithm would return:

*   Adam, B
*   Ericks, B
*   Landry, B
*   Bendrix, C
*   Jones, C

Whereas an unstable algorithm might switch around Bendrix and Jones, since it does not keep the input order it was given. Merge sort is, by nature, a stable algorithm.

2\. If you want a time complexity no worse than O(nLogn): MergeSort is always O(nLogn), so you can never do worse.

With that stuff out of the way, let’s get to the Javascript implementation of MergeSort.

**MergeSort**

As we said before, MergeSort is comprised of two functions. Let’s pseudocode the schnitzel out of both of them to understand what the process is going to look like. This often helps take the problem itself from something abstract and scary to something more manageable.

Let’s do each of the two functions (slicing function and merging function) separately:

```
Slicing function:     Take input of single array of values  
       determine base case for recursive call of function (as we    
       mentioned before, the goal is to arrive at 1-element arrays) Calculate middle of array, and set variables equal to the left     
     and right portions of it.  
     
   Recursively call this function on the left and then the right,   
   passing the result of both into the second function. (We'll           
   diagram this out and show logs, don't worry. This isn't as   
   confusing once you see the full chain of events)Merging function:   
    
   Accept a "left" and a "right" parameter  
      These will be the result of the recursive calls above, to the     
      right and left sides (again, diagrams will help ALOT) Create a result array into which the sorted values will be   
   pushed, as well as a indexer value for the left array and    
   indexer for the right array, both set to 0. Create a while loop that will loop through the two arrays passed  
   in as long as both arrays are being looped through. Whichever     
   array contains the smaller value at the particular index is   
   inserted into the result array.  
   
   Whichever array has its value inserted has its indexer increased,       
   and the loop runs again Once we reach the end of one of the arrays, we concatenate the     
   remaining values from the other array.   We return the resultant array.
```

Ok. That was a lot, and it’s a step in the right direction. But it’s still really confusing: how many times does this run, and what does it look like when it does this? What will those recursive calls look like?

First, let’s take a diagram for an example to help us visualize this:

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/1236/1\*PKTHd9tFQbF-dyUd0DSOew.png" width="618" height="595" srcSet="https://miro.medium.com/max/552/1\*PKTHd9tFQbF-dyUd0DSOew.png 276w, https://miro.medium.com/max/1104/1\*PKTHd9tFQbF-dyUd0DSOew.png 552w, https://miro.medium.com/max/1236/1\*PKTHd9tFQbF-dyUd0DSOew.png 618w" sizes="618px"/>

Thanks, GeeksforGeeks!

Let’s break this down.

```
1\. We get the input of an unsorted array.  
2\. Our splitting happens, and we have two halves of the original array  
3\. We reach our first recursive call. Remember, the recursion to the left happens first, until it can happen no more. Therefore, we split left. Follow the numbers in the diagram, they help!  
4\. We end up with an array of a single value. Perfect. Here's the tricky part, and what was, for me, the key to the whole thing: Remember how recursion works with the call stack? We stack each call on the previous ones until we return (hit our base case), and then we pop off the older ones one at a time, returning through each. That's what happens here! We return via our base case with that leftmost value (step 4, value 38). Then, we go back to the previous function call at the stack, where we also had 27, and run to the right for our first time! We now have two returned arrays of one value, so we can run our second function for the first time!5\. Whew, ok, don't worry about the last step, i'll show you some call stack snapshots as we run through our actual code. For now, let's move on to this step, where our merging function runs for the first time. We create the result array and indexers, loop through the left array (value of 38) and right array (value of 27). Our right array is smaller, so we increase the index at the right, and add 27 to our result. We then break out of the loop, since the right index is now equal to the array length, and concat the left array. We return that, and continue through the sorting process. 6\. We've run through the 27 and 38 split, so our call stack pops back to \[38,27,43,3\] and we run down the mergeSort(right) calls, going through the same process as described above. We run through our merge, and pop off from the stack again. 7\. We've now reached another critical juncture. We have two sorted arrays of two values each: \[27,38\] and \[3,43\]. It's now time to merge those as well! We run through the merging function, arriving at \[3,27,38,43\] and then returning. We now can go all the way back to where our original array was split in half, and run through the right half, doing the same thing! 8\. Finally, we have our two halves all sorted, and we merge those to arrive at a final, sorted array. 
```

Whew. Ok, breathe. It’s going to be alright. Let’s walk through this with code and actual call stack visualization, at which point all of this should become easier to actually picture. I recommend going through all of this again once you’ve been through the code and see how it works.

**Coding Time**

Let’s tackle the sorting function first:

```
function sorting(originalArr) {  
    //_take in our original array, and immediately define the base   
      case = when array length 1._ if(originalArr.length === 1) return originalArr //_slicing and dicing time. Cut the array into halves and capture      
      both of them._ let middle = Math.ceil(arr.length/2),  
        left = originalArr.slice(0, middle),  
        right = originalArr.slice(middle); //_here's where the magic happens: we call our merging function on     
     the_ **_result_** _of the recursive calls to mergeSort for the left and     
     right sides of our array._ return merging(  
        sorting(left),  
        sorting(right)    
    )  
}
```

Ok, not too scary! As long as you just ignore that crazy looking recursive call there at the bottom, piece of cake, right?! \*nervous laughter\* (Don’t worry, like I said, we will go through an actual example with call stack

Now for the merging function:

```
function merging(left, right) {  
    //_set our result array, as well as both indeces_ let result = \[\],  
        leftIndexer = 0,  
        rightIndexer = 0; //_looping time!_ while(leftIndexer < left.length && rightIndexer < right.length) {  
         if(left\[leftIndexer\] < right\[rightIndexer\]) {  
              result.push(left\[leftIndexer\])  
              leftIndexer++  
         } else {  
              result.push(right\[rightIndexer\])  
              rightIndexer++  
         }  
   }  
//_now concat the remaining values from the array that was not fully run through by the loop above._let returnArr = result.concat(left.slice(leftIndexer)).concat(right.slice(rightIndexer))  
   
 return returnArr}
```

Wow. On their own, these functions are not that scary, right? Broken down, they aren’t nearly as frightening as they sound conceptually. It’s a lot of action for not a lot of code. Let’s see how it works with a set of numbers.

**Example**

Let’s take \[43,27,9,3\] as an example, just to keep things from getting too long.

Step 1: First splitting happens, we arrive at \[43, 27\] and \[9,3\], and reach our first recursive call. Nothing too crazy yet:

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*80L0UPuNjUzMHOValmSyvQ.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*80L0UPuNjUzMHOValmSyvQ.png 276w, https://miro.medium.com/max/1104/1\*80L0UPuNjUzMHOValmSyvQ.png 552w, https://miro.medium.com/max/1280/1\*80L0UPuNjUzMHOValmSyvQ.png 640w, https://miro.medium.com/max/1400/1\*80L0UPuNjUzMHOValmSyvQ.png 700w" sizes="700px"/>

Our call stack stands at our original call, plus the new one we will now run through with our mergeSort(left). We pass in the left array, \[43,27\], and run again.

Here’s what it looks like at the end of that run:

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*mjE1Xg-KlKVrW3MoE-ZLCA.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*mjE1Xg-KlKVrW3MoE-ZLCA.png 276w, https://miro.medium.com/max/1104/1\*mjE1Xg-KlKVrW3MoE-ZLCA.png 552w, https://miro.medium.com/max/1280/1\*mjE1Xg-KlKVrW3MoE-ZLCA.png 640w, https://miro.medium.com/max/1400/1\*mjE1Xg-KlKVrW3MoE-ZLCA.png 700w" sizes="700px"/>

Second time through, we have both arrays with one index in each. Perfect! We can start returning in the next frame. Here’s a quick reminder: that crazy looking call to merge will **not** run until we have values returned for both recursive calls to mergeSort. Keep that in mind.

Now, we run into our base case where array length is 1, and return:

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*DXMHA1Wuq0ywSpXdiweJkA.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*DXMHA1Wuq0ywSpXdiweJkA.png 276w, https://miro.medium.com/max/1104/1\*DXMHA1Wuq0ywSpXdiweJkA.png 552w, https://miro.medium.com/max/1280/1\*DXMHA1Wuq0ywSpXdiweJkA.png 640w, https://miro.medium.com/max/1400/1\*DXMHA1Wuq0ywSpXdiweJkA.png 700w" sizes="700px"/>

Where do we go from here? That’s right, the next function on the stack! (keep your eye on the incredibly helpful call stack on the console’s right). That’s where we had an array with length 2! Look at the input array and the call stack! We’re back to two elements in the array and down to two calls in the stack. The first is our original call, and this is the second we just came back to after going down the rabbit hole of the left side of the array. Whew, ok.

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*JMcWQMrNk6veNMZMYslojg.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*JMcWQMrNk6veNMZMYslojg.png 276w, https://miro.medium.com/max/1104/1\*JMcWQMrNk6veNMZMYslojg.png 552w, https://miro.medium.com/max/1280/1\*JMcWQMrNk6veNMZMYslojg.png 640w, https://miro.medium.com/max/1400/1\*JMcWQMrNk6veNMZMYslojg.png 700w" sizes="700px"/>

Now what? Well, we go down the right side, of course! Remember, once we returned through the left side, we continue through the execution of the function we pop back to! Man, functional programming, recursion, algorithms, we are having fun now!

Anyways, we go down the right side, which now has 27. Pretty straightforward, we hit our base case again and return back to this stage again. Here’s what that looks like:

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*XpYMDuJz89tkIxaIOtIdgQ.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*XpYMDuJz89tkIxaIOtIdgQ.png 276w, https://miro.medium.com/max/1104/1\*XpYMDuJz89tkIxaIOtIdgQ.png 552w, https://miro.medium.com/max/1280/1\*XpYMDuJz89tkIxaIOtIdgQ.png 640w, https://miro.medium.com/max/1400/1\*XpYMDuJz89tkIxaIOtIdgQ.png 700w" sizes="700px"/>

We hit our base case, returning 27, and return to the second function on the stack, our 2-length array:

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*ksicO2vGmcO4p242rMmOQA.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*ksicO2vGmcO4p242rMmOQA.png 276w, https://miro.medium.com/max/1104/1\*ksicO2vGmcO4p242rMmOQA.png 552w, https://miro.medium.com/max/1280/1\*ksicO2vGmcO4p242rMmOQA.png 640w, https://miro.medium.com/max/1400/1\*ksicO2vGmcO4p242rMmOQA.png 700w" sizes="700px"/>

Oh BAM! Look at what happened! We reached the merge function! That’s because we went back to the 2-length array -level of our function calls on the stack. Once we were there, and we had finished the mergeSort(left) as well as the mergeSort(right), we passed those values into the merge function, with our left and right values passed right along! BOOM. #LetThatSinkIn!

Let’s run through what this looks like:

We have our results, our right will be smaller, so we increase indexRight after pushing 27 into our array, and end our loop right there. We set returnArray equal to result (which is currently \[27\]) concatenated with the remnants of the left array (\[43\]), and achieve (\[27,43\]). Great success!

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*g2\_r1\_w\_Q4MAwgV7EToAPA.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*g2\_r1\_w\_Q4MAwgV7EToAPA.png 276w, https://miro.medium.com/max/1104/1\*g2\_r1\_w\_Q4MAwgV7EToAPA.png 552w, https://miro.medium.com/max/1280/1\*g2\_r1\_w\_Q4MAwgV7EToAPA.png 640w, https://miro.medium.com/max/1400/1\*g2\_r1\_w\_Q4MAwgV7EToAPA.png 700w" sizes="700px"/>

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*\_CuJ-RJ0oHYCDT3wDXo66g.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*\_CuJ-RJ0oHYCDT3wDXo66g.png 276w, https://miro.medium.com/max/1104/1\*\_CuJ-RJ0oHYCDT3wDXo66g.png 552w, https://miro.medium.com/max/1280/1\*\_CuJ-RJ0oHYCDT3wDXo66g.png 640w, https://miro.medium.com/max/1400/1\*\_CuJ-RJ0oHYCDT3wDXo66g.png 700w" sizes="700px"/>

Great! Let’s continue!

What happens again?

Oh, right! We return out of our 2-index level function! Let’s see it in action:

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*Ro1TrOgyk2arJKGx5qaw8g.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*Ro1TrOgyk2arJKGx5qaw8g.png 276w, https://miro.medium.com/max/1104/1\*Ro1TrOgyk2arJKGx5qaw8g.png 552w, https://miro.medium.com/max/1280/1\*Ro1TrOgyk2arJKGx5qaw8g.png 640w, https://miro.medium.com/max/1400/1\*Ro1TrOgyk2arJKGx5qaw8g.png 700w" sizes="700px"/>

Woah, confusing stuff, right? WRONG! We got this! Look at the call stack for help: we are back to just our original call! This is amazing, because it gives us insight into what the heck happened in the first place. When we originally called this function, we descended into the left mergeSort further and further! ALL of the above was the internal process of the left mergeSort from our **original** function call to mergeSort with our **original array**. This means that we now go…. to the right! Perfect! We are following the pattern step by step, and feelin’ great!

Here’s what that run down the right looks like:

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*0I4aQzucK1CMBwtntu\_CTg.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*0I4aQzucK1CMBwtntu\_CTg.png 276w, https://miro.medium.com/max/1104/1\*0I4aQzucK1CMBwtntu\_CTg.png 552w, https://miro.medium.com/max/1280/1\*0I4aQzucK1CMBwtntu\_CTg.png 640w, https://miro.medium.com/max/1400/1\*0I4aQzucK1CMBwtntu\_CTg.png 700w" sizes="700px"/>

Just like with the left, we split into the half of the array we are working with.

We run through the functions again, getting to the base and returning, for both sides, just like last time:

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*NTKFGMKoresTc5I39BZbig.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*NTKFGMKoresTc5I39BZbig.png 276w, https://miro.medium.com/max/1104/1\*NTKFGMKoresTc5I39BZbig.png 552w, https://miro.medium.com/max/1280/1\*NTKFGMKoresTc5I39BZbig.png 640w, https://miro.medium.com/max/1400/1\*NTKFGMKoresTc5I39BZbig.png 700w" sizes="700px"/>

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*dUYf6yc7HY56c8gdqzzTYg.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*dUYf6yc7HY56c8gdqzzTYg.png 276w, https://miro.medium.com/max/1104/1\*dUYf6yc7HY56c8gdqzzTYg.png 552w, https://miro.medium.com/max/1280/1\*dUYf6yc7HY56c8gdqzzTYg.png 640w, https://miro.medium.com/max/1400/1\*dUYf6yc7HY56c8gdqzzTYg.png 700w" sizes="700px"/>

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*LhQc9Z4trlXgNGn4ZfNkPg.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*LhQc9Z4trlXgNGn4ZfNkPg.png 276w, https://miro.medium.com/max/1104/1\*LhQc9Z4trlXgNGn4ZfNkPg.png 552w, https://miro.medium.com/max/1280/1\*LhQc9Z4trlXgNGn4ZfNkPg.png 640w, https://miro.medium.com/max/1400/1\*LhQc9Z4trlXgNGn4ZfNkPg.png 700w" sizes="700px"/>

We run into our merge function for this side, and merge the two values together in a sorted array:

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*tSi9P6eR3dbPOorMMZYoKQ.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*tSi9P6eR3dbPOorMMZYoKQ.png 276w, https://miro.medium.com/max/1104/1\*tSi9P6eR3dbPOorMMZYoKQ.png 552w, https://miro.medium.com/max/1280/1\*tSi9P6eR3dbPOorMMZYoKQ.png 640w, https://miro.medium.com/max/1400/1\*tSi9P6eR3dbPOorMMZYoKQ.png 700w" sizes="700px"/>

Keep an eye on the call stack: we finish the merge, and return through our two-value array (which returned the merge call and ultimately, the merged array) up to the original array. We now have run through the right and left trees of our **original array.** Definitely getting close to the end! Great!

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*-BlVOwmrIuOGXYIL4PVr3A.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*-BlVOwmrIuOGXYIL4PVr3A.png 276w, https://miro.medium.com/max/1104/1\*-BlVOwmrIuOGXYIL4PVr3A.png 552w, https://miro.medium.com/max/1280/1\*-BlVOwmrIuOGXYIL4PVr3A.png 640w, https://miro.medium.com/max/1400/1\*-BlVOwmrIuOGXYIL4PVr3A.png 700w" sizes="700px"/>

Now that we’ve run through our ORIGINAL mergeSort calls to the right and left, we call the ORIGINAL merge! (Look at the stack again, it’s your best friend now. You love and live the stack. Long live the stack.) You have one call on the stack, which means we are at the original call to the mergeSort! Almost there!

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*Dcy-XgJRDIRncmfSiVZClg.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*Dcy-XgJRDIRncmfSiVZClg.png 276w, https://miro.medium.com/max/1104/1\*Dcy-XgJRDIRncmfSiVZClg.png 552w, https://miro.medium.com/max/1280/1\*Dcy-XgJRDIRncmfSiVZClg.png 640w, https://miro.medium.com/max/1400/1\*Dcy-XgJRDIRncmfSiVZClg.png 700w" sizes="700px"/>

Merging….

<img alt="Image for post" class="t u v hn aj" src="https://miro.medium.com/max/5120/1\*tIFlM0tMPElHL-N5gKguPg.png" width="2560" height="1600" srcSet="https://miro.medium.com/max/552/1\*tIFlM0tMPElHL-N5gKguPg.png 276w, https://miro.medium.com/max/1104/1\*tIFlM0tMPElHL-N5gKguPg.png 552w, https://miro.medium.com/max/1280/1\*tIFlM0tMPElHL-N5gKguPg.png 640w, https://miro.medium.com/max/1400/1\*tIFlM0tMPElHL-N5gKguPg.png 700w" sizes="700px"/>

We run through the loop, as any usual loop works, and we get our final array! WE DID IT!!!

**Thoughts:**

That was intense. Wow. But we did it! Takeaways?

Remember to look for the stack. In recursive problems, the stack gives us a sense of not only where we are, but what we are taking with us into each call. It’s really awesome.

Remember to divide and conquer for this problem. One function for merging, the other for sorting.

Remember to not freak out when you do this problem, like I definitely did the first few times! Read through this again if it has any chance of helping, and let me know your thoughts in the comments! Oh, and please clap away if possible! Thanks!