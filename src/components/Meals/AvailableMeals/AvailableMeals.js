import mealsList from '../../../data/meals.json';
import classes from './AvailableMeals.module.css';
import MealItem from '../MealItem/MealItem';
import Card from '../../UI/Card/Card'


const AvailableMeals = () => {
    return (
        <Card className={classes.meals}>
            <section >
                <ul>
                    {mealsList.map((meal) => (
                            <MealItem key={meal.id} meal={meal} />
                        )
                    )}
                </ul>
            </section>
        </Card>
    )
};

export default AvailableMeals;