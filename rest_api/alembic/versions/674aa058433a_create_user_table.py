"""create user table

Revision ID: 674aa058433a
Revises: c4cb65bd677a
Create Date: 2023-10-06 16:04:43.912894

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '674aa058433a'
down_revision: Union[str, None] = 'c4cb65bd677a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    op.create_table(
        'user',
        sa.Column('id', sa.Integer(), primary_key = True),
        sa.Column('first_name', sa.String(64), nullable = False),
        sa.Column('last_name', sa.String(64), nullable = False),
        sa.Column('password', sa.String(256), nullable = False),
        sa.Column('username', sa.String(256), nullable = False),
        sa.Column('email', sa.String(64), nullable = True),
        sa.Column('user_role_id', sa.Integer(), nullable = False),
        sa.ForeignKeyConstraint(['user_role_id'], ['user_role.id'], ondelete = 'cascade')
    )
    pass

def downgrade() -> None:
    op.drop_table('user')
    pass
