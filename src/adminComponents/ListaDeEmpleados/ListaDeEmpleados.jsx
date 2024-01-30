import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee, updateEmployee } from '../../redux/features/empleadoSlice';
import styles from './ListaDeEmpleados.module.css';

const ListaDeEmpleados = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employee);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    nombre_completo: '',
    cargo: '',
    cedula_a: '',
    cedula_b: '',
    posicion: '',
    // Otros campos
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (employeeId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      dispatch(deleteEmployee(employeeId));
    }
  };

  const handleEdit = (employeeId) => {
    const employeeToEdit = employees.find((employee) => employee.id === employeeId);
    setEditedData({
      id: employeeToEdit.id,
      nombre_completo: employeeToEdit.nombre_completo,
      cargo: employeeToEdit.cargo,
      cedula_a: employeeToEdit.cedula_a || '',
      cedula_b: employeeToEdit.cedula_b || '',
      posicion: employeeToEdit.posicion || '',
      // Otros campos
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = async (employeeId) => {
    await dispatch(updateEmployee({ id: employeeId, ...editedData }));
    setIsEditing(false);
    setEditedData({});
    dispatch(fetchEmployees());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  // Ordenar empleados por la posición
  const sortedEmployees = [...employees].sort((a, b) => a.posicion - b.posicion);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de empleados</h1>
      <ul className={styles.employeeList}>
        {sortedEmployees.map((employee) => (
          <li key={employee.id} className={styles.employeeItem}>
            {isEditing && editedData.id === employee.id ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(employee.id); }}>
                <label>Nombre Completo:</label>
                <input type="text" name="nombre_completo" value={editedData.nombre_completo} onChange={handleInputChange} />

                <label>Cargo:</label>
                <input type="text" name="cargo" value={editedData.cargo} onChange={handleInputChange} />

                <label>Cédula A:</label>
                <input type="text" name="cedula_a" value={editedData.cedula_a} onChange={handleInputChange} />

                <label>Cédula B:</label>
                <input type="text" name="cedula_b" value={editedData.cedula_b} onChange={handleInputChange} />

                <label>Posicion:</label>
                <input type="text" name="posicion" value={editedData.posicion} onChange={handleInputChange} />
                {/* Otros campos */}
                <button type="submit">Guardar cambios</button>
                <button type="button" onClick={handleCancelEdit}>
                  Cancelar
                </button>
              </form>
            ) : (
              <>
                <span>
                  {employee.posicion}- <br /> {employee.nombre_completo} - {employee.cargo} - {employee.cedula_a} - {employee.cedula_b}
                </span>

                <img className={styles.fotoN} src={employee.foto} alt="" />
                <button className={styles.editButton} onClick={() => handleEdit(employee.id)}>
                  Editar
                </button>

                <button className={styles.deleteButton} onClick={() => handleDelete(employee.id)}>
                  Eliminar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaDeEmpleados;
