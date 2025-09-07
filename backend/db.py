from sqlmodel import SQLModel, create_engine, Field, Session
engine = create_engine("sqlite:///./app.db", echo=False)

# class Transaction model
class Transaction(SQLModel, table=True):
    pass

def init_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session