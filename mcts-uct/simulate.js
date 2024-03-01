
export function simulate(child)
{
    child.visitCount++;
    child.value = null // Fix this.

    console.log("Hello Simulate");
}