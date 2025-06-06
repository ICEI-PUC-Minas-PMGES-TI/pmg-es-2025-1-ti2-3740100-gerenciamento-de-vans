package com.vanwize.vanback.models;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@JsonTypeInfo(
  use = JsonTypeInfo.Id.NAME,
  include = JsonTypeInfo.As.PROPERTY,
  property = "user_type"
)
@JsonSubTypes({
  @JsonSubTypes.Type(value = Dono.class, name = "Dono"),
  @JsonSubTypes.Type(value = Driver.class, name = "Motorista"),
  @JsonSubTypes.Type(value = Responsavel.class, name = "Responsavel")
})

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
public class User {
  public interface CreateUser { }
  public interface UpdateUser { }

  public static final String TABLE_NAME = "users";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", unique = true)
  private Long id;
  // username
  @Column(name = "username", length = 50, nullable = false, unique = true)
  @NotNull(groups = CreateUser.class)
  @NotEmpty(groups = CreateUser.class)
  @Size(groups = CreateUser.class, min = 3, max = 50)
  private String username;
  // password
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @Column(name = "password", length = 30, nullable = false)
  @NotNull(groups = { CreateUser.class })
  @NotEmpty(groups = { CreateUser.class, UpdateUser.class })
  @Size(groups = { CreateUser.class, UpdateUser.class }, min = 8, max = 30)
  private String password;
  // email
  @Column(name = "email", length = 100, nullable = false, unique = true)
  @NotNull(groups = { CreateUser.class, UpdateUser.class })
  @NotEmpty(groups = { CreateUser.class, UpdateUser.class })
  private String email;
  // cpf
  @Column(name = "cpf", unique = true, nullable = false, updatable = false)
  @NotNull(groups = CreateUser.class)
  @NotEmpty(groups = CreateUser.class)
  @Size(groups = CreateUser.class, min = 14, max = 14)
  private String cpf;
  // phone
  @Column(name = "phone", length = 15, nullable = false)
  @NotNull(groups = { CreateUser.class, UpdateUser.class })
  @NotEmpty(groups = { CreateUser.class, UpdateUser.class })
  @Size(groups = { CreateUser.class, UpdateUser.class }, max = 15)
  private String phone;
  // birthdate
  @Column(name = "birthdate", length = 10, nullable = false)
  @NotNull(groups = { CreateUser.class, UpdateUser.class })
  private Date birthdate;
  // cep
  @Column(name = "cep", length = 9, nullable = true)
  @Size(groups = CreateUser.class, min = 9, max = 9)
  @NotNull(groups = { CreateUser.class, UpdateUser.class })
  private String cep;
  //Cidade
  @Column(name = "cidade", length = 50, nullable = true)
  @Size(groups = CreateUser.class, min = 3, max = 50)
  private String cidade;
  //Estado
  @Column(name = "estado", length = 50, nullable = true)
  @Size(groups = CreateUser.class, min = 2, max = 50)
  private String estado;
 //Complemento
  @Column(name = "complemento", length = 50, nullable = true)
  @Size(groups = CreateUser.class, min = 3, max = 50)
  private String complemento;
  //numero
  @Column(name = "numero", length = 10, nullable = true)
  @Size(groups = CreateUser.class, min = 1, max = 10)
  private String numero;

  

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Checkin> checkins = new ArrayList<Checkin>();

  public User() {
  }

  public User(Long id, String username, String password, String email, String cpf, String phone, Date birthdate, String cep, String cidade, String estado, String complemento, String numero) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.cpf = cpf;
    this.phone = phone;
    this.birthdate = birthdate;
    this.cep = cep;
    this.cidade = cidade;
    this.estado = estado;
    this.complemento = complemento;
    this.numero = numero;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return this.username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getCpf() {
    return this.cpf;
  }

  public void setCpf(String cpf) {
    this.cpf = cpf;
  }

  public String getPhone() {
    return this.phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public Date getBirthdate() {
    return this.birthdate;
  }

  public void setBirthdate(Date birthdate) {
    this.birthdate = birthdate;
  }

  public String getCep() {
    return this.cep;
  }

  public void setCep(String cep) {
    this.cep = cep;
  }

  public String getCidade() {
    return this.cidade;
  }

  public void setCidade(String cidade) {
    this.cidade = cidade;
  }

  public String getEstado() {
    return this.estado;
  }

  public void setEstado(String estado) {
    this.estado = estado;
  }

  public String getComplemento() {
    return this.complemento;
  }

  public void setComplemento(String complemento) {
    this.complemento = complemento;
  } 

  public String getNumero() {
    return this.numero;
  }

  public void setNumero(String numero) {
    this.numero = numero;
  }
  
  @JsonIgnore
  public List<Checkin> getCheckins() {
    return this.checkins;
  }

  public void setCheckins(List<Checkin> checkins) {
    this.checkins = checkins;
  }

  @Override
  public boolean equals(Object obj) {
    if (obj == this)
      return true;
    if (obj == null)
      return false;
    if (!(obj instanceof User))
      return false;
    User other = (User) obj;
    if (this.id == null)
      if (other.id != null)
        return false;

      else if (!this.id.equals(other.id))
        return false;

    return Objects.equals(this.username, other.username) && Objects.equals(this.password, other.password)
        && Objects.equals(this.email, other.email)
        && Objects.equals(this.cpf, other.cpf) && Objects.equals(this.phone, other.phone)
        && Objects.equals(this.birthdate, other.birthdate);
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((id == null) ? 0 : id.hashCode());
    return result;
  }

}
//Subclasses
@Entity
@DiscriminatorValue("Motorista")
class Driver extends User {
  //cnh
  @Column(name = "cnh", length = 11, nullable = true, unique = true)
  @Size(groups = CreateUser.class, min = 11, max = 11)
  private String cnh;
  //ANTT
  @Column(name = "antt", length = 9, nullable = true, unique = true)
  @Size(groups = CreateUser.class, min = 9, max = 9)
  private String antt;

  public Driver() { }

  public Driver(Long id, String Username, String password, String email, String cpf, String phone,
    Date birthdate, String cnh, String antt, String cep, String cidade, String estado, String complemento, String numero) {
    super(id, Username, password, email, cpf, phone, birthdate, cep, cidade, estado, complemento, numero);
    this.cnh = cnh;
    this.antt = antt;
  }
  public String getCnh() {
    return this.cnh;
  }
  public void setCnh(String cnh) {
    this.cnh = cnh;
  }
  public String getAntt() {
    return this.antt;
  }
  public void setAntt(String antt) {
    this.antt = antt;
  }


}
@Entity
@Table(name = "filhos")
class Filho {
  //id filho
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", unique = true)
  private Long id;
  //nome filho
  @Size(min = 5, max = 50)
  @Column(name = "nome", length = 50, nullable = false)
  private String nome;
  //cpf filho
  @Column(name = "cpf", length = 14, nullable = false, unique = true)
  private String cpf;
  //nascimento filho
  @Column(name = "nascimento", length = 10, nullable = false)
  private Date  nascimento;
  //responsavel filho
  @ManyToOne
  @JoinColumn(name = "responsavel_id", nullable = false)
  private Responsavel responsavel;

  public Filho() { }
  public Filho(Long id, String nome, String cpf, Date nascimento, Responsavel responsavel) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.nascimento = nascimento;
    this.responsavel = responsavel;
  }
  public Long getId() {
    return this.id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public String getNome() {
    return this.nome;
  }
  public void setNome(String nome) {
    this.nome = nome;
  }
  public String getCpf() {
    return this.cpf;
  }
  public void setCpf(String cpf) {
    this.cpf = cpf;
  }
  public Date getNascimento() {
    return this.nascimento;
  }
  public void setNascimento(Date nascimento) {
    this.nascimento = nascimento;
  }
  public Responsavel getResponsavel() {
    return this.responsavel;
  }
  public void setResponsavel(Responsavel responsavel) {
    this.responsavel = responsavel;
  }
}

@Entity
@DiscriminatorValue("Responsavel")
class Responsavel extends User {
  @OneToMany(mappedBy = "responsavel", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Filho> filhos = new ArrayList<>();

  public List<Filho> getFilhos(){
    return filhos;
  }
  public void setFilhos(List<Filho> filhos){
    if(filhos != null && filhos.size() > 5){
      throw new IllegalArgumentException("Um responsável não pode ter mais de 5 filhos");

    }
    if (filhos != null) {
      for (Filho filho : filhos) {
        filho.setResponsavel(this);
      }
    }
    this.filhos = filhos;
  }

}

@Entity
@DiscriminatorValue("Dono")
class Dono extends User {
  @Column(name = "cnpj", length = 18, nullable = true, unique = true)
  @Size(groups = CreateUser.class, min = 18, max = 18)
  private String cnpj;
  
  public Dono() { }

  public Dono(Long id, String username, String password, String email, String cpf, String phone,
    Date birthdate, String cnpj, String cep, String cidade, String estado, String complemento, String numero) {
    super(id, username, password, email, cpf, phone, birthdate, cep, cidade, estado, complemento, numero);
    this.cnpj = cnpj;
  }
  public String getCnpj() {
    return this.cnpj;
  }
  public void setCnpj(String cnpj) {
    this.cnpj = cnpj;
  }

}