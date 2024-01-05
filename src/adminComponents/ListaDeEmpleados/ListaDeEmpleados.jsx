import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../../redux/features/empleadoSlice';
import styles from './ListaDeEmpleados.module.css';

const ListaDeEmpleados = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (employeeId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      dispatch(deleteEmployee(employeeId));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de empleados</h1>
      <ul className={styles.employeeList}>
        {employees.map((employee) => (
          <li key={employee.id} className={styles.employeeItem}>
            {employee.cedula_a ? (
              <span>
                {employee.nombre_completo} - {employee.cargo} - {employee.cedula_a} - {employee.cedula_b}
              </span>
            ) : (
              <span>
                {employee.nombre_completo} - {employee.cargo}
              </span>
            )}
            <img className={styles.fotoN} src={employee.foto} alt="" />
            <button className={styles.deleteButton} onClick={() => handleDelete(employee.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaDeEmpleados;
