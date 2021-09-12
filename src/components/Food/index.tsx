import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';


interface IFood {
  id:number;
  name:string;
  description:string;
  price:string;
  available:boolean;
  image:string;
}

interface FoodProps {
  food : IFood;
  handleEditFood: (food:IFood) => void
  handleDelete: (id:number) => void
};




export function Food({ food, handleEditFood, handleDelete } : FoodProps) {
  const { id, available ,name, description, price } = food;
  const [IsAvailable, setIsAvailable] = useState(available);

  const toggleAvailable = async () => {

    await api.put(`/foods/${id}`, {
      ...food,
      IsAvailable: !IsAvailable,
    });

    setIsAvailable(!IsAvailable);
  }

  const setEditingFood = () => {
    handleEditFood(food);
  }

    return (
      <Container available={IsAvailable}>
        <header>
          <img src={food.image} alt={food.name} />
        </header>
        <section className="body">
          <h2>{name}</h2>
          <p>{description}</p>
          <p className="price">
            R$ <b>{price}</b>
          </p>
        </section>
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={setEditingFood}
              data-testid={`edit-food-${id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => handleDelete(id)}
              data-testid={`remove-food-${id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>

          <div className="availability-container">
            <p>{IsAvailable ? 'Disponível' : 'Indisponível'}</p>

            <label htmlFor={`available-switch-${id}`} className="switch">
              <input
                id={`available-switch-${id}`}
                type="checkbox"
                checked={IsAvailable}
                onChange={toggleAvailable}
                data-testid={`change-status-food-${id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </section>
      </Container>
    );
  
};
